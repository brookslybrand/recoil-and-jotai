module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-1': 'repeat(1, auto)',
        'auto-2': 'repeat(2, auto)',
        'auto-3': 'repeat(3, auto)',
        'auto-4': 'repeat(4, auto)',
        'auto-5': 'repeat(5, auto)',
        'auto-6': 'repeat(6, auto)',
        'auto-7': 'repeat(7, auto)',
        'auto-8': 'repeat(8, auto)',
        'auto-9': 'repeat(9, auto)',
        'auto-10': 'repeat(10, auto)',
        'auto-11': 'repeat(11, auto)',
        'auto-12': 'repeat(12, auto)',
      },
      gridTemplateRows: {
        'auto-1': 'repeat(1, auto)',
        'auto-2': 'repeat(2, auto)',
        'auto-3': 'repeat(3, auto)',
        'auto-4': 'repeat(4, auto)',
        'auto-5': 'repeat(5, auto)',
        'auto-6': 'repeat(6, auto)',
        'auto-7': 'repeat(7, auto)',
        'auto-8': 'repeat(8, auto)',
        'auto-9': 'repeat(9, auto)',
        'auto-10': 'repeat(10, auto)',
        'auto-11': 'repeat(11, auto)',
        'auto-12': 'repeat(12, auto)',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    borderWidth: ['focus'],
  },
  plugins: [],
}
