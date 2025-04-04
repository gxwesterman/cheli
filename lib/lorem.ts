export const Lorem = `Okay, here's a long response crammed with markdown goodies. I'll try to cover a variety of features to demonstrate its capabilities. Get ready for some formatting!
 
# A Title: The Wonders of Markdown!
Markdown is a lightweight markup language with plain text formatting syntax. It's designed to be both easy to read and easy to write. This makes it perfect for writing everything from quick notes to complete books!

> ## A Subtitle: Why Use Markdown?
> * **Readability:** Markdown documents are readable even in their raw text form. No complicated HTML tags obscuring the content.
> * **Portability:** You can use Markdown on pretty much any platform. It's just text!
> * **Convertibility:** Markdown can be easily converted to HTML, PDF, DOCX, and many other formats.
> * **Simplicity:** It's much easier to learn than HTML or LaTeX.
> * **Version Control Friendly:** Since it's plain text, it's perfect for use with Git and other version control systems.
> 
> ### An Even Smaller Subtitle: Basic Markdown Syntax
> Let's dive into some of the most common Markdown syntax elements.
> 
> #### Headings
> As you can see, headings are created using \`#\` symbols. The number of \`#\` symbols determines the heading level:
> 
> \`\`\`markdown
> # Heading 1
> ## Heading 2
> ### Heading 3
> #### Heading 4
> ##### Heading 5
> ###### Heading 6
> \`\`\`
> 
> renders as:
> 
> # Heading 1
> ## Heading 2
> ### Heading 3
> #### Heading 4
> ##### Heading 5
> ###### Heading 6
> 
> #### Emphasis
> You can add emphasis to your text using asterisks (*) or underscores (_).
> 
> * \`*Italic text*\` becomes *Italic text*
> * \`_Italic text_\` becomes *Italic text*
> * \`**Bold text**\` becomes **Bold text**
> * \`__Bold text__\` becomes **Bold text**
> * \`***Bold and italic text***\` becomes ***Bold and italic text***
> * \`___Bold and italic text___\` becomes ***Bold and italic text***
> 
> #### Lists
> Markdown supports both ordered (numbered) and unordered (bulleted) lists.
> 
> **Unordered Lists:**
> 
> \`\`\`markdown
> * Item 1
> * Item 2
> * Sub-item 1
> * Sub-item 2
> * Item 3
> \`\`\`
> 
> Renders as:
> 
> * Item 1
> * Item 2
> * Sub-item 1
> * Sub-item 2
> * Item 3
> 
> **Ordered Lists:**
> 
> \`\`\`markdown
> 1. First item
> 2. Second item
> 3. Third item
> \`\`\`
> 
> Renders as:
> 
> 1. First item
> 2. Second item
> 3. Third item
> 
> You don't even have to use consecutive numbers! Markdown will automatically number the list correctly.
> 
> \`\`\`markdown
> 1. First item
> 1. Second item
> 1. Third item
> \`\`\`
> 
> Renders as:
> 
> 1. First item
> 2. Second item
> 3. Third item
> 
> #### Links
> Links are created using square brackets \`[]\` for the link text and parentheses \`()\` for the URL.
> 
> \`\`\`markdown
> [This is a link to Google](https://www.google.com)
> \`\`\`
> 
> Renders as:
> 
> [This is a link to Google](https://www.google.com)
> 
> You can also create *reference-style* links:
> 
> \`\`\`markdown
> [This is a reference link][google]
> [google]: https://www.google.com "Google's Homepage"
> \`\`\`
> 
> Renders as:
> 
> [This is a reference link][google]  
> [google]: https://www.google.com "Google's Homepage"
> 
> #### Images
> Images are similar to links, but with an exclamation mark \`!\` at the beginning.
> 
> \`\`\`markdown
> ![Alt text for the image](https://www.easygifanimator.net/images/samples/video-to-gif-sample.gif)
> \`\`\`
> 
> Renders as:
> 
> ![Alt text for the image](https://www.easygifanimator.net/images/samples/video-to-gif-sample.gif)
> 
> Like links, images can also use reference-style syntax.
> 
> #### Blockquotes
> Blockquotes are created using the \`>\` symbol.
> 
> \`\`\`markdown
> > This is a blockquote.
> > 
> > It can span multiple lines and paragraphs.
> > 
> > > You can even nest blockquotes!
> \`\`\`
> 
> Renders as:
> 
> > This is a blockquote.
> > 
> > It can span multiple lines and paragraphs.
> > 
> > > You can even nest blockquotes!
> 
> #### Code
> You can display code in two ways: inline code and code blocks.
> 
> **Inline Code:** Use backticks \`\` \`\` to enclose inline code.
> 
> \`\`\`markdown
> Use the \`print()\` function to display output.
> \`\`\`
> 
> Renders as:
> 
> Use the \`print()\` function to display output.
> 
> **Code Blocks:** Use triple backticks \`\`\`\`\` to create code blocks. You can also specify the language for syntax highlighting.
> 
> \`\`\`markdown
> \`\`\`python
> def hello_world():
> print("Hello, world!")
> hello_world()
> \`\`\`
> \`\`\`
> 
> Renders as:
> 
> \`\`\`python
> def hello_world():
> print("Hello, world!")
> hello_world()
> \`\`\`
> 
> #### Horizontal Rule
> Create a horizontal rule using three or more hyphens (\`---\`), asterisks (\`***\`), or underscores (\`___\`).
> 
> \`\`\`markdown
> ---
> \`\`\`
> 
> Renders as:
> 
> ---
> 
> ### Advanced Markdown (and extensions!)
> Some Markdown processors (like GitHub Flavored Markdown - GFM) support extensions. Here are a few examples:
> 
> * **Tables:**
> 
> \`\`\`markdown
> | Header 1 | Header 2 | Header 3 |
> | -------- | -------- | -------- |
> | Cell 1   | Cell 2   | Cell 3   |
> | Cell 4   | Cell 5   | Cell 6   |
> \`\`\`
> 
> Renders as:
> 
> | Header 1 | Header 2 | Header 3 |
> | -------- | -------- | -------- |
> | Cell 1   | Cell 2   | Cell 3   |
> | Cell 4   | Cell 5   | Cell 6   |
> 
> You can also align the text within the columns:
> 
> \`\`\`markdown
> | Left-Aligned  | Center-Aligned | Right-Aligned |
> | :-----------  | :------------:  | ------------: |
> | Left          | Center          | Right          |
> | Left          | Center          | Right          |
> \`\`\`
> 
> Renders as:
> 
> | Left-Aligned  | Center-Aligned | Right-Aligned |
> | :-----------  | :------------:  | ------------: |
> | Left          | Center          | Right          |
> | Left          | Center          | Right          |
> 
> * **Task Lists:**
> 
> \`\`\`markdown
> - [x] Completed task
> - [ ] Incomplete task
> \`\`\`
> 
> Renders as:
> 
> - [x] Completed task
> - [ ] Incomplete task
> 
> * **Strikethrough:** Use two tildes \`\~\~\` to strikethrough text.
> 
> \`\`\`markdown
> ~~This text is struck through.~~
> \`\`\`
> 
> Renders as:
> 
> ~~This text is struck through.~~
> 
> ### Conclusion
> Markdown is a powerful and versatile tool for creating formatted text. Its simplicity and readability make it a great choice for a wide range of applications. Experiment with the different syntax elements and explore Markdown extensions to unleash its full potential! Go forth and write! And remember to check the specific flavor of Markdown your environment supports, as features may vary!
`;