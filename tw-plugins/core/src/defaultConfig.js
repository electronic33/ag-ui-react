const defaultConfig = {
  theme: {
    components: {
      button: {
        borderRadius: '0.25rem',
        colors: {},
        sizes: {
          sm: {
            px: '0.5rem',
            fontSize: '0.75rem',
            height: '1.5rem',
          },
          md: {
            px: '0.75rem',
            fontSize: '0.875rem',
            height: '2.125rem',
          },
          lg: {
            px: '1rem',
            fontSize: '1rem',
            height: '2.625rem',
          },
          xl: {
            px: '3rem',
            fontSize: '1.375rem',
            height: '3.125rem',
          },
        },
        primary: {
          focusRing: 'rgba(167, 139, 250, 1)',
          filled: {
            default: {
              bg: 'rgba(124,58,237,1.0)',
              textColor: 'rgba(255,255,255,1.0)',
            },
            hover: {
              bg: 'rgba(139,92,246,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
            },
            pressed: {
              bg: 'rgba(76,29,149,1.0)',
              textColor: 'rgba(255,255,255,1.0)',
            },
            disabled: {
              bg: 'rgba(124,58,237,1.0)',
              textColor: 'rgba(255,255,255,1.0)',
              opacity: '0.2',
            },
          },
          outline: {
            default: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(124,58,237,1.0)',
              textColor: 'rgba(124,58,237,1.0)',
            },
            hover: {
              bg: 'rgba(221,214,254,1.0)',
              border: '1px solid rgba(124,58,237,1.0)',
              textColor: 'rgba(124,58,237,1.0)',
            },
            pressed: {
              bg: 'rgba(196,181,253,1.0)',
              border: '1px solid rgba(76,29,149,1.0)',
              textColor: 'rgba(76,29,149,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(124,58,237,1.0)',
              textColor: 'rgba(124,58,237,1.0)',
              opacity: '0.2',
            },
          },
          ghost: {
            default: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(124,58,237,1.0)',
            },
            hover: {
              bg: 'rgba(221,214,254,1.0)',
              border: 'none',
            },
            pressed: {
              bg: 'rgba(196,181,253,1.0)',
              border: 'none',
              textColor: 'rgba(76,29,149,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: 'none',
              textColor: 'rgba(124,58,237,1.0)',
              opacity: '0.2',
            },
          },
        },
        neutral: {
          focusRing: 'rgba(156,163,175,1.0)',
          filled: {
            default: {
              bg: 'rgba(229,231,235,1.0)',
              textColor: 'rgba(55,65,81,1.0)',
              border: '1px solid rgba(55,65,81,1.0)',
            },
            hover: {
              bg: 'rgba(229,231,235,1.0)',
              textColor: 'rgba(55,65,81,1.0)',
              border: '1px solid rgba(55,65,81,1.0)',
            },
            pressed: {
              bg: 'rgba(55,65,81,1.0)',
              textColor: 'rgba(209,213,219,1.0)',
              border: '1px solid rgba(55,65,81,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              textColor: 'rgba(55,65,81,1.0)',
              border: '1px solid rgba(55,65,81,1.0)',

              opacity: '0.2',
            },
          },
          outline: {
            default: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(229,231,235,1.0)',
              textColor: 'rgba(229,231,235,1.0)',
            },
            hover: {
              bg: 'rgba(229,231,235,1.0)',
              border: '1px solid rgba(229,231,235,1.0)',
              textColor: 'rgba(229,231,235,1.0)',
            },
            pressed: {
              bg: 'rgba(196,181,253,1.0)',
              border: '1px solid rgba(76,29,149,1.0)',
              textColor: 'rgba(76,29,149,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(229,231,235,1.0)',
              textColor: 'rgba(229,231,235,1.0)',
              opacity: '0.2',
            },
          },
          ghost: {
            default: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(55,65,81,1.0)',
            },
            hover: {
              bg: 'rgba(229,231,235,1.0)',
              border: 'none',
            },
            pressed: {
              bg: 'rgba(196,181,253,1.0)',
              border: 'none',
              textColor: 'rgba(76,29,149,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: 'none',
              textColor: 'rgba(229,231,235,1.0)',
              opacity: '0.2',
            },
          },
        },
        warning: {
          focusRing: 'rgba(251,191,36,1.0)',
          filled: {
            default: {
              bg: 'rgba(217,119,6,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            hover: {
              bg: 'rgba(217,119,6,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            pressed: {
              bg: 'rgba(180,83,9,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            disabled: {
              bg: 'rgba(217,119,6,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
              opacity: '0.2',
            },
          },
          outline: {
            default: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(217,119,6,1.0)',
              textColor: 'rgba(217,119,6,1.0)',
            },
            hover: {
              bg: 'rgba(254,243,199,1.0)',
              border: '1px solid rgba(217,119,6,1.0)',
              textColor: 'rgba(217,119,6,1.0)',
            },
            pressed: {
              bg: 'rgba(252,211,77,1.0)',
              border: '1px solid rgba(180,83,9,1.0)',
              textColor: 'rgba(180,83,9,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(217,119,6,1.0)',
              textColor: 'rgba(217,119,6,1.0)',
              opacity: '0.2',
            },
          },
          ghost: {
            default: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(217,119,6,1.0)',
            },
            hover: {
              bg: 'rgba(254,243,199,1.0)',
              border: 'none',
              textColor: 'rgba(217,119,6,1.0)',
            },
            pressed: {
              bg: 'rgba(254,243,199,1.0)',
              border: 'none',
              textColor: 'rgba(180,83,9,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: 'none',
              textColor: 'rgba(217,119,6,1.0) ',
              opacity: '0.2',
            },
          },
        },
        success: {
          focusRing: 'rgba(167,243,208,1.0)',
          filled: {
            default: {
              bg: 'rgba(16,185,129,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            hover: {
              bg: 'rgba(5,150,105,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            pressed: {
              bg: 'rgba(4,120,87,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            disabled: {
              bg: 'rgba(16,185,129,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
              opacity: '0.2',
            },
          },
          outline: {
            default: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(16,185,129,1.0)',
              textColor: 'rgba(16,185,129,1.0) ',
            },
            hover: {
              bg: 'rgba(209,250,229,1.0)',
              border: '1px solid rgba(16,185,129,1.0)',
              textColor: 'rgba(16,185,129,1.0)',
            },
            pressed: {
              bg: 'rgba(110,231,183,1.0)',
              border: '1px solid rgba(4,120,87,1.0)',
              textColor: 'rgba(4,120,87,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(16,185,129,1.0)',
              textColor: 'rgba(16,185,129,1.0)',
              opacity: '0.2',
            },
          },
          ghost: {
            default: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(16,185,129,1.0)',
            },
            hover: {
              bg: 'rgba(209,250,229,1.0)',
              border: 'none',
              textColor: 'rgba(16,185,129,1.0)',
            },
            pressed: {
              bg: 'rgba(167,243,208,1.0)',
              border: 'none',
              textColor: 'rgba(4,120,87,1.0)',
            },
            disabled: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(16,185,129,1.0)',
              opacity: '0.2',
            },
          },
        },
        danger: {
          focusRing: 'rgba(254,202,202,1.0)',
          filled: {
            default: {
              bg: 'rgba(220,38,38,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            hover: {
              bg: 'rgba(239,68,68,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            pressed: {
              bg: 'rgba(185,28,28,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
            },
            disabled: {
              bg: 'rgba(220,38,38,1.0)',
              textColor: 'rgba(249,250,251,1.0)',
              border: 'none',
              opacity: '0.2',
            },
          },
          outline: {
            default: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(239,68,68,1.0)',
              textColor: 'rgba(239,68,68,1.0) ',
            },
            hover: {
              bg: 'rgba(254,226,226,1.0)',
              border: '1px solid rgba(239,68,68,1.0)',
              textColor: 'rgba(239,68,68,1.0)',
            },
            pressed: {
              bg: 'rgba(252,165,165,1.0)',
              border: '1px solid rgba(185,28,28,1.0)',
              textColor: 'rgba(185,28,28,1.0)',
            },
            disabled: {
              bg: 'rgba(249,250,251,1.0)',
              border: '1px solid rgba(239,68,68,1.0)',
              textColor: 'rgba(239,68,68,1.0) ',
              opacity: '0.2',
            },
          },
          ghost: {
            default: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(239,68,68,1.0)',
            },
            hover: {
              bg: 'rgba(254,226,226,1.0)',
              border: 'none',
              textColor: 'rgba(239,68,68,1.0)',
            },
            pressed: {
              bg: 'rgba(254,202,202,1.0)',
              border: 'none',
              textColor: 'rgba(185,28,28,1.0)',
            },
            disabled: {
              bg: 'transparent',
              border: 'none',
              textColor: 'rgba(239,68,68,1.0)',
              opacity: '0.2',
            },
          },
        },
      },
      label: {
        sizes: {
          color: 'rgba(17, 24, 39, 1)',
          fontWeight: '600',
          sm: {
            fontSize: '0.875rem',
          },
          md: {
            fontSize: '1',
          },
          lg: {
            fontSize: '1.125rem',
          },
        },
      },
      select: {
        borderRadius: '0.25rem',
        iconColor: 'rgba(156, 163, 175, 1)',
        placeholderColor: 'rgba(156, 163, 175, 1)',
        textColor: 'rgba(17, 24, 39, 1)',
        sizes: {
          fontWeight: '600',
          sm: {
            height: '2rem',
          },
          md: {
            height: '2.5rem',
          },
          lg: {
            height: '3rem',
          },
        },
        default: {
          bg: 'rgba(255,255,255,1.0)',
          border: '1px solid rgba(209, 213, 219, 1)',
        },
        focused: {
          bg: 'rgba(255,255,255,1.0)',
          border: '2px solid rgba(167, 139, 250, 1)',
        },
        disabled: {
          bg: 'rgba(229, 231, 235, 1)',
          border: '1px solid rgba(209, 213, 219, 1)',
        },
        error: {
          bg: 'rgba(255,255,255,1.0)',
          border: '1px solid rgba(220, 38, 38, 1)',
          textColor: 'rgba(220, 38, 38, 1)',
        },
      },
      checkbox: {
        sizes: {
          fontWeight: '600',
          sm: {
            height: '1rem',
          },
          md: {
            height: '1.25rem',
          },
          lg: {
            height: '1.5rem',
          },
        },
        borderRadius: '0.25rem',
        unChecked: {
          bg: 'rgba(255,255,255,1.0)',
          border: '2px solid rgba(209, 213, 219, 1)',
        },
        checked: {
          bg: 'rgba(124, 58, 237, 1)',
          border: '2px solid rgba(209, 213, 219, 1)',
        },
        focusRing: {
          border: '4px solid rgba(167, 139, 250, 1)',
        },
      },
    },
  },
};

module.exports = defaultConfig;
