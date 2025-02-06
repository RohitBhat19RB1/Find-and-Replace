# FindandReplaceTool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
A simple Angular-based tool for finding and replacing text with support for case sensitivity, regular expressions, undo/redo functionality, and text highlighting.

# Features

Find and replace words or phrases in a given text.
Supports case-sensitive and regex-based searches.
Highlights all occurrences of the searched word.
Replace next occurrence or replace all at once.
Undo/redo functionality to revert or restore changes.
Saves text in local storage to retain input after refresh.
Resets to clear all text and search history.

# Installation & Setup

### 1. Clone this repository:

    git clone repository-url
  
    cd find-replace-tool
  
### 2. Install dependencies:

   npm install
  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Steps to Reproduce

Enter text in the input field.

Enter a word or phrase to find.

Enter a replacement word or phrase.

Choose case-sensitive or regex-based search.

Click Find to highlight occurrences.

Click Replace Next to replace one occurrence at a time.

Click Replace All to replace all occurrences at once.

Use Undo/Redo to revert/restore changes.

Click Reset to clear all inputs.

## Test Scenarios for Find and Replace Tool
### 1. Basic Word Replacement
✅ Input: "Hello world hello"

🔍 Find: "hello"

✏️ Replace: "greeting"

🔹 Expected Output: "greeting world greeting"


### 2. Case Sensitivity
#### Test 1: Case Sensitivity Off

✅ Input: "Hello HELLO hello"

🔍 Find: "hello"

✏️ Replace: "greeting"

🔹 Expected Output: "greeting greeting greeting"

#### Test 2: Case Sensitivity On
✅ Input: "Hello HELLO hello"

🔍 Find: "hello"

✏️ Replace: "greeting"

🔹 Expected Output: "Hello HELLO greeting"


### 3. Regex Matching
#### Test 1: Email Pattern
✅ Input: "Contact me at john@example.com and jane@test.com"

🔍 Regex: \b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b

✏️ Replace: "[email redacted]"

🔹 Expected Output: "Contact me at [email redacted] and [email redacted]"


### 4. Partial Word Replacement
✅ Input: "The cat sat on the cat mat"

🔍 Find: "cat"

✏️ Replace: "dog"

🔹 Expected Output: "The dog sat on the dog mat"

### 5. Undo/Redo Functionality
Perform multiple replacements.

Click Undo to revert changes.

Click Redo to restore changes.
### 6. Edge Cases
Empty input: No action should occur.

No matches found: Text remains unchanged.

Replacing with an empty string: Effectively removes the found text.

Very long text: Should handle large input efficiently.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Screenshot
![image](https://github.com/user-attachments/assets/87681c83-2a97-4e2c-9617-6d51939cb975)

