import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface MatchResult {
  match: string;
  index: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  text = '';
  findText = '';
  replaceText = '';
  caseSensitive = false;
  useRegex = false;

  history: string[] = [];
  redoStack: string[] = [];
  matchResults: MatchResult[] = [];
  currentMatchIndex = -1;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.initializeLocalStorage();
  }

  private initializeLocalStorage() {
    const savedText = localStorage.getItem('savedText');
    if (savedText) {
      this.text = savedText;
      this.searchMatches();
    }
  }

  private saveToHistory() {
    this.history.push(this.text);
    this.redoStack = [];
    localStorage.setItem('savedText', this.text);
  }

  searchMatches() {
    if (!this.findText) {
      this.matchResults = [];
      this.currentMatchIndex = -1;
      return;
    }

    try {
      const flags = this.caseSensitive ? 'g' : 'gi';
      const searchPattern = this.useRegex ? this.findText : this.escapeRegex(this.findText);
      const regex = new RegExp(searchPattern, flags);
      
      const matches = [...this.text.matchAll(regex)];
      this.matchResults = matches.map(match => ({
        match: match[0],
        index: match.index || 0
      }));
      
      this.currentMatchIndex = this.matchResults.length > 0 ? 0 : -1;
    } catch (error) {
      console.error('Search error', error);
      this.matchResults = [];
      this.currentMatchIndex = -1;
    }
  }

  highlightText(): SafeHtml {
    if (!this.findText) return this.sanitizer.bypassSecurityTrustHtml(this.text);

    try {
      const flags = this.caseSensitive ? 'g' : 'gi';
      const searchPattern = this.useRegex ? this.findText : this.escapeRegex(this.findText);
      const regex = new RegExp(searchPattern, flags);

      const highlightedText = this.text.replace(regex, (match, offset) => {
        const isCurrent = this.matchResults.findIndex(m => m.match === match && m.index === offset) === this.currentMatchIndex;
        return `<span class="highlight ${isCurrent ? 'current' : ''}">${match}</span>`;
      });

      return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
    } catch (error) {
      console.error('Highlight error', error);
      return this.sanitizer.bypassSecurityTrustHtml(this.text);
    }
  }

  replaceNext(): void {
    if (!this.findText || this.matchResults.length === 0) return;
  
    this.saveToHistory();
    const currentMatch = this.matchResults[this.currentMatchIndex];
    
    // Replace only first occurrence after current match index
    const beforeText = this.text.substring(0, currentMatch.index);
    const afterText = this.text.substring(currentMatch.index + currentMatch.match.length);
    
    this.text = beforeText + this.replaceText + afterText;
    
    this.searchMatches();
    this.currentMatchIndex = Math.min(this.currentMatchIndex, this.matchResults.length - 1);
  }

  replaceAll() {
    if (!this.findText) return;

    this.saveToHistory();

    const flags = this.caseSensitive ? 'g' : 'gi';
    const searchPattern = this.useRegex ? this.findText : this.escapeRegex(this.findText);
    
    this.text = this.text.replace(new RegExp(searchPattern, flags), this.replaceText);
    this.searchMatches();
  }

  undo() {
    if (this.history.length > 0) {
      this.redoStack.push(this.text);
      this.text = this.history.pop() || '';
      this.searchMatches();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      this.history.push(this.text);
      this.text = this.redoStack.pop() || '';
      this.searchMatches();
    }
  }

  escapeRegex(text: string) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  resetTool() {
    this.text = '';
    this.findText = '';
    this.replaceText = '';
    this.matchResults = [];
    this.currentMatchIndex = -1;
    this.history = [];
    this.redoStack = [];
    localStorage.removeItem('savedText');
  }
}