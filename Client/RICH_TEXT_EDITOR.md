# Rich Text Editor Utility

A reusable Rich Text Editor component built with React Quill for the StackIt Q&A platform.

## Features

### 📝 Text Formatting
- **Bold**, *Italic*, <u>Underline</u>, ~~Strikethrough~~
- Text color and background color
- Headers (H1-H6)
- Subscript and Superscript

### 📋 Lists & Layout
- Numbered lists
- Bullet points
- Text alignment (Left, Center, Right)
- Indentation controls
- RTL text support

### 🔗 Media & Links
- Hyperlink insertion
- Image upload and embedding
- Video embedding
- Blockquotes
- Code blocks

### 🎨 Advanced Features
- Clean formatting tool
- Emoji support (through standard text input)
- Copy/paste with formatting preservation
- Undo/Redo functionality

## Usage

### Basic Import
```jsx
import RichTextEditor from './components/RichTextEditor'
```

### Simple Example
```jsx
const [content, setContent] = useState('')

<RichTextEditor
  value={content}
  onChange={setContent}
  placeholder="Start typing..."
  height="200px"
  toolbar="standard"
/>
```

### Toolbar Options

#### Minimal Toolbar
Perfect for comments and short responses:
```jsx
<RichTextEditor
  toolbar="minimal"
  // Features: Bold, Italic, Underline, Links
/>
```

#### Standard Toolbar
Great for answers and medium-length content:
```jsx
<RichTextEditor
  toolbar="standard"
  // Features: Basic formatting, Lists, Alignment, Links, Images
/>
```

#### Full Toolbar
Complete feature set for detailed questions and articles:
```jsx
<RichTextEditor
  toolbar="full"
  // Features: All formatting options, Headers, Colors, Code blocks, etc.
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | '' | The HTML content value |
| `onChange` | function | - | Callback when content changes |
| `placeholder` | string | 'Start typing...' | Placeholder text |
| `height` | string | '200px' | Editor height |
| `toolbar` | string | 'full' | Toolbar type: 'minimal', 'standard', 'full' |
| `className` | string | '' | Additional CSS classes |
| `error` | boolean | false | Show error styling |

### Pre-built Components

#### AnswerForm
Ready-to-use component for posting answers:
```jsx
import AnswerForm from './components/AnswerForm'

<AnswerForm
  questionId="123"
  onSubmit={handleAnswerSubmit}
  onCancel={() => setShowAnswer(false)}
/>
```

#### CommentForm
Ready-to-use component for posting comments:
```jsx
import CommentForm from './components/CommentForm'

<CommentForm
  targetId="456"
  targetType="question"
  onSubmit={handleCommentSubmit}
  onCancel={() => setShowComment(false)}
/>
```

## Examples

Visit `/editor-examples` to see live examples of all editor configurations and use cases.

## Styling

The editor uses Tailwind CSS for styling and includes:
- Light theme design
- Error state styling
- Responsive design
- Inter font family
- Custom scrollbars
- Proper focus states

## Integration

The Rich Text Editor is already integrated into:
- ✅ Ask Question page (`/ask`)
- ✅ Answer forms
- ✅ Comment forms
- ✅ Any custom form component

## Tips

1. **Content Validation**: Always validate that content is not empty and has minimum length:
   ```jsx
   if (!content.trim() || content === '<p><br></p>') {
     // Handle empty content
   }
   
   if (content.replace(/<[^>]*>/g, '').length < 10) {
     // Handle minimum length
   }
   ```

2. **Image Handling**: Images are embedded as base64 by default. For production, consider uploading to a CDN.

3. **Sanitization**: Always sanitize HTML content on the backend before saving to database.

4. **Performance**: For large content, consider debouncing the onChange handler.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support  
- Safari: Full support
- Mobile browsers: Full support with touch interactions
