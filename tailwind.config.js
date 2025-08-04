/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            '[class~="lead"]': {
              color: '#4b5563',
            },
            a: {
              color: '#2563eb',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: {
              color: '#111827',
              fontWeight: '600',
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal',
            },
            'ol > li': {
              position: 'relative',
            },
            'ol > li::marker': {
              fontWeight: '400',
              color: '#6b7280',
            },
            'ul > li': {
              position: 'relative',
            },
            'ul > li::marker': {
              color: '#d1d5db',
            },
            hr: {
              borderColor: '#e5e7eb',
              borderTopWidth: 1,
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: '#111827',
              borderLeftWidth: '0.25rem',
              borderLeftColor: '#3b82f6',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            h1: {
              color: '#111827',
              fontWeight: '800',
            },
            'h1 strong': {
              fontWeight: '900',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
            },
            'h2 strong': {
              fontWeight: '800',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
            },
            'h3 strong': {
              fontWeight: '700',
            },
            h4: {
              color: '#111827',
              fontWeight: '600',
            },
            'h4 strong': {
              fontWeight: '700',
            },
            img: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            'figure > *': {
              marginTop: '0',
              marginBottom: '0',
            },
            figcaption: {
              color: '#6b7280',
              fontSize: '0.875em',
              lineHeight: 1.4285714,
              marginTop: '0.8571429em',
            },
            code: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '"`"',
            },
            'code::after': {
              content: '"`"',
            },
            'a code': {
              color: '#111827',
            },
            'h1 code': {
              color: '#111827',
            },
            'h2 code': {
              color: '#111827',
            },
            'h3 code': {
              color: '#111827',
            },
            'h4 code': {
              color: '#111827',
            },
            'blockquote code': {
              color: '#111827',
            },
            'thead th code': {
              color: '#111827',
            },
            pre: {
              color: '#e5e7eb',
              backgroundColor: '#1f2937',
              overflowX: 'auto',
              fontWeight: '400',
              fontSize: '0.875em',
              lineHeight: 1.7142857,
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
              borderRadius: '0.375rem',
              paddingTop: '0.8571429em',
              paddingRight: '1.1428571em',
              paddingBottom: '0.8571429em',
              paddingLeft: '1.1428571em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.875em',
              lineHeight: 1.7142857,
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: '#d1d5db',
            },
            'thead th': {
              color: '#111827',
              fontWeight: '600',
              verticalAlign: 'bottom',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: '#e5e7eb',
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'tbody td': {
              verticalAlign: 'baseline',
            },
            tfoot: {
              borderTopWidth: '1px',
              borderTopColor: '#d1d5db',
            },
            'tfoot td': {
              verticalAlign: 'top',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-lead': '#9ca3af',
            '--tw-prose-links': '#60a5fa',
            '--tw-prose-bold': '#f9fafb',
            '--tw-prose-counters': '#9ca3af',
            '--tw-prose-bullets': '#4b5563',
            '--tw-prose-hr': '#374151',
            '--tw-prose-quotes': '#f3f4f6',
            '--tw-prose-quote-borders': '#374151',
            '--tw-prose-captions': '#9ca3af',
            '--tw-prose-code': '#f9fafb',
            '--tw-prose-pre-code': '#d1d5db',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#374151',
            '--tw-prose-td-borders': '#4b5563',
            '--tw-prose-invert-body': '#d1d5db',
            '--tw-prose-invert-headings': '#f9fafb',
            '--tw-prose-invert-lead': '#9ca3af',
            '--tw-prose-invert-links': '#60a5fa',
            '--tw-prose-invert-bold': '#f9fafb',
            '--tw-prose-invert-counters': '#9ca3af',
            '--tw-prose-invert-bullets': '#4b5563',
            '--tw-prose-invert-hr': '#374151',
            '--tw-prose-invert-quotes': '#f3f4f6',
            '--tw-prose-invert-quote-borders': '#374151',
            '--tw-prose-invert-captions': '#9ca3af',
            '--tw-prose-invert-code': '#f9fafb',
            '--tw-prose-invert-pre-code': '#d1d5db',
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': '#374151',
            '--tw-prose-invert-td-borders': '#4b5563',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};