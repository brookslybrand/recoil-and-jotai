module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['focus'],
  },
  plugins: [],
}
