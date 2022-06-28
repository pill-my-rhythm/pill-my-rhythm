module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5ae1dc",
          secondary: "#41d1a6",
          accent: "#ea6493",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#6490ea",
          warning: "#BC2828",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
