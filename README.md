# Demo-Custom-Toast-Message

> A customizable toast/alert notification system for React Native apps, built with Expo.

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props & API](#props--api)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Customizable toast messages (success, error, warning, info)
- Animated appearance/disappearance using `react-native-reanimated`
- Stacked toasts with auto-dismiss
- Easy integration with React Context
- Icon support via `react-native-vector-icons`

---



## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Coderooz/Demo-Custom-Toast-Messages.git
   cd demo-custom-alerts
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the Expo project:**
   ```sh
   npm start
   # or
   expo start
   ```

---

## Usage

1. **Wrap your app with the ToastProvider:**
   ```jsx
   import { ToastProvider } from './context/ToastContext';
   // ...
   <ToastProvider>
     {/* your app code */}
   </ToastProvider>
   ```
2. **Use the `useToast` hook to show toasts:**
   ```jsx
   import { useToast } from './context/ToastContext';
   // ...
   const { showToast } = useToast();
   showToast({
     alert: 'success',
     title: 'Success!',
     message: 'Your action was successful.',
     duration: 3000, // optional
   });
   ```
3. **See `screen/ToastDisplay.jsx` for demo usage.**

---

## Props & API

### showToast(options)
- `alert`: `'success' | 'error' | 'warning' | 'info'` (default: 'info')
- `title`: `string` (required)
- `message`: `string` (required)
- `duration`: `number` (ms, default: 3000)

### Toast Component
- Customizes icon, color, and background based on `alert` type
- Animates in/out and stacks if multiple toasts are shown

---

## Project Structure
```
.
├── App.js
├── components/
│   └── Toast.jsx
├── context/
│   └── ToastContext.js
├── screen/
│   └── ToastDisplay.jsx
├── assets/
│   └── [icons, screenshots]
├── package.json
└── ...
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## License

[MIT](LICENSE)

---

**Author:** [Coderooz](https://github.com/Coderooz)
