/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,json}'],
  theme: {
    extend: {
      colors: {
        // 深蓝工业风主色
        brand: {
          50: '#eef3fa',
          100: '#d6e2f2',
          200: '#adc4e4',
          300: '#7fa1d2',
          400: '#4d76b3',
          500: '#2b5695',
          600: '#193b70', // 主色
          700: '#163463',
          800: '#122a4f',
          900: '#0e203c',
        },
        // 辅助橙色（CTA / 强调）
        accent: {
          50: '#fef4ea',
          100: '#fde5cd',
          200: '#fbc99b',
          300: '#f8ab68',
          400: '#f5923e',
          500: '#f27c22', // 辅助色
          600: '#d9660f',
          700: '#b34f0c',
          800: '#8c3d0c',
          900: '#6e310c',
        },
      },
      fontFamily: {
        // Inter（拉丁） + Noto Sans（西里尔/俄语） 兜底，保证俄语正常显示
        sans: [
          'Inter',
          'Noto Sans',
          '"Noto Sans SC"',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Inter',
          'Noto Sans',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      maxWidth: {
        content: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.18)',
        cardHover: '0 2px 4px rgba(16,24,40,.05), 0 18px 40px -18px rgba(25,59,112,.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .6s cubic-bezier(.22,.61,.36,1) both',
      },
    },
  },
  plugins: [],
};
