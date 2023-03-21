module.exports = {
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(', ')
  },
  i18n: {
    locales: ['en-us', 'en-gb', 'fr-fr'],
    defaultLocale: 'en-us'
  },
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL
  },
  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/api/auth/callback/wpLogin',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      },
      {
        source: '/api/auth/providers',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      },
      {
        source: '/api/auth/csrf',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      },
      {
        source: '/api/auth/session',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      },
      {
        source: '/api/auth/signout',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          }
        ]
      }
    ]
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/order-tracking',
        destination: '/my-account/orders',
        permanent: true
      },
      {
        source: '/d1demo',
        destination: '/solutions/dicksonone',
        permanent: true
      },
      {
        source: '/feedback',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/dicksonware',
        destination: '/products/data-loggers?tags=software',
        permanent: true
      },
      {
        source: '/author/mattm',
        destination: 'https://info.dicksondata.com/blog',
        permanent: true
      },
      {
        source: '/dickson-insights-february-2019',
        destination: 'https://info.dicksondata.com/blog',
        permanent: true
      },
      {
        source: '/vaccine-temperature-monitoring',
        destination: '/solutions/vaccine-storage-monitoring',
        permanent: true
      },
      {
        source: '/dickson-catalog-342-d',
        destination: '/r/Dickson-Catalog/?page=1',
        permanent: true
      },
      {
        source: '/author/wpengine',
        destination: 'https://info.dicksondata.com/blog',
        permanent: true
      },
      {
        source: '/search-results',
        destination: '/',
        permanent: true
      },
      {
        source: '/press-releases',
        destination: 'https://info.dicksondata.com/blog',
        permanent: true
      },
      {
        source: '/category/dickson-insights',
        destination: 'https://info.dicksondata.com/blog',
        permanent: true
      },
      {
        source: '/dickson-catalogo-341-d',
        destination: '/r/Dickson-Catalog/?page=1',
        permanent: true
      },
      {
        source: '/emerald-and-atlas-overview-video',
        destination: '/products',
        permanent: true
      },
      {
        source: '/dickson-catalog-341-d',
        destination: '/r/Dickson-Catalog/?page=1',
        permanent: true
      },
      {
        source: '/hello-world',
        destination: '/',
        permanent: true
      },
      {
        source: '/category/uncategorized',
        destination: '/',
        permanent: true
      },
      {
        source: '/request-a-free-consultation',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/request-a-free-consultation-dickson',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/request-a-consultation-pressure',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/about-dickson',
        destination: '/about',
        permanent: true
      },
      // {
      //   source: '/my-account',
      //   destination: '/my-account/',
      //   permanent: true
      // },
      {
        source: '/dicksonone',
        destination: '/solutions/dicksonone',
        permanent: true
      },
      {
        source: '/oceaview',
        destination: '/solutions/oceaview',
        permanent: true
      },
      {
        source: '/industries',
        destination: '/solutions',
        permanent: true
      },
      {
        source: '/industries/hospital-healthcare',
        destination: '/solutions/hospital-healthcare',
        permanent: true
      },
      {
        source: '/industries/pharmaceutical',
        destination: '/solutions/pharmaceutical',
        permanent: true
      },
      {
        source: '/industries/manufacturing-production',
        destination: '/solutions/manufacturing-production',
        permanent: true
      },
      {
        source: '/industries/food',
        destination: '/solutions/food-beverage',
        permanent: true
      },
      {
        source: '/industries/medical-device-manufacturers',
        destination: '/solutions/medical-devices',
        permanent: true
      },
      {
        source: '/industries/aerospace',
        destination: '/solutions/aerospace',
        permanent: true
      },
      {
        source: '/industries/3pl',
        destination: '/solutions/3rd-party-logistics',
        permanent: true
      },
      {
        source: '/product-category/services/installation',
        destination: '/services/installation',
        permanent: true
      },
      {
        source: '/product-category/services/validation',
        destination: '/services/validation',
        permanent: true
      },
      {
        source: '/product-category/services',
        destination: '/services',
        permanent: true
      },
      {
        source: '/applications',
        destination: '/solutions',
        permanent: true
      },
      {
        source: '/applications/humidity-monitoring',
        destination: '/solutions',
        permanent: true
      },
      {
        source: '/applications/temperature-monitoring',
        destination: '/solutions',
        permanent: true
      },
      {
        source: '/applications/differential-pressure',
        destination: '/solutions',
        permanent: true
      },
      {
        source: '/applications/pressure-monitoring',
        destination: '/solutions',
        permanent: true
      },
      {
        source: '/applications/cold-room-refrigerator-monitoring',
        destination: '/solutions/cold-room-refrigerator-monitoring',
        permanent: true
      },
      {
        source: '/applications/ambient-monitoring',
        destination: '/solutions/ambient-monitoring',
        permanent: true
      },
      {
        source: '/applications/chamber-monitoring',
        destination: '/solutions/chamber-monitoring',
        permanent: true
      },
      {
        source: '/applications/incubator-monitoring',
        destination: '/solutions/incubator-monitoring',
        permanent: true
      },
      {
        source: '/cold-room-refrigerator-monitoring',
        destination: '/solutions/cold-room-refrigerator-monitoring',
        permanent: true
      },
      {
        source: '/web-animation-3',
        destination: '/',
        permanent: true
      },
      {
        source: '/web-animation-2',
        destination: '/',
        permanent: true
      },
      {
        source: '/web-animation-3-3',
        destination: '/',
        permanent: true
      },
      {
        source: '/web-animation-3-3-2',
        destination: '/',
        permanent: true
      },
      {
        source: '/web-animation-3-4',
        destination: '/',
        permanent: true
      },
      {
        source: '/resources/faqs',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/contact',
        destination: '/contact',
        permanent: true
      },
      {
        source: '/resources',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/catalog-archive',
        destination: '/catalog',
        permanent: true
      },
      {
        source: '/resources/manuals',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/whitepapers',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/support',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/support/oceaview',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/support/calibration-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source: '/resources/support/other-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/oceaview/check-or-modify-server-address-on-lora-gateway',
        destination:
          '/support/article/check-or-modify-server-address-on-lora-gateway',
        permanent: true
      },
      {
        source:
          '/resources/support/other-support-articles/assuring-accurate-temperature-measurement',
        destination:
          '/support/article/assuring-accurate-temperature-measurement',
        permanent: true
      },
      {
        source:
          '/resources/support/other-support-articles/proper-temperature-measurement',
        destination: '/support/article/proper-temperature-measurement',
        permanent: true
      },
      {
        source: '/resources/support/calibration-support-articles/calibration',
        destination: '/support/article/calibration',
        permanent: true
      },

      {
        source: '/resources/support/data-logger-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/device-unit-will-not-turn-on',
        destination: '/support/article/device-unit-will-not-turn-on',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/device-will-not-communicate-with-pc',
        destination: '/support/article/device-will-not-communicate-with-pc',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/device-will-not-power-up-frozen-display',
        destination: '/support/article/device-will-not-power-up-frozen-display',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/replacing-batteries',
        destination: '/support/article/replacing-batteries',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/why-wont-the-data-logger-respond-to-any-button-presses',
        destination:
          '/support/article/why-wont-the-data-logger-respond-to-any-button-presses',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/blank-space-in-the-data-graph',
        destination: '/support/article/blank-space-in-the-data-graph',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/sm-device-error-codes',
        destination: '/support/article/sm-device-error-codes',
        permanent: true
      },
      {
        source: '/resources/support/data-logger-support-articles/pro-series',
        destination: '/support/article/pro-series',
        permanent: true
      },
      {
        source: '/resources/support/data-logger-support-articles/battery-life',
        destination: '/support/article/battery-life',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/how-to-set-alarms-on-the-mm120',
        destination: '/support/article/how-to-set-alarms-on-the-mm120',
        permanent: true
      },
      {
        source:
          '/resources/support/data-logger-support-articles/running-a-probe-into-a-refrigerator',
        destination: '/support/article/running-a-probe-into-a-refrigerator',
        permanent: true
      },

      {
        source: '/resources/support/chart-recorder-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-are-the-pen-traces-erratic',
        destination: '/support/article/why-are-the-pen-traces-erratic',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-isnt-the-chart-keeping-time-or-running-slow',
        destination:
          '/support/article/why-isnt-the-chart-keeping-time-or-running-slow',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-did-the-chart-stop-turning',
        destination: '/support/article/why-did-the-chart-stop-turning',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-doesnt-the-pen-match-the-display',
        destination: '/support/article/why-doesnt-the-pen-match-the-display',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-does-calibration-seem-to-be-off',
        destination: '/support/article/why-does-calibration-seem-to-be-off',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-wont-the-chart-recorder-rotate',
        destination: '/support/article/why-wont-the-chart-recorder-rotate',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/setting-alarms',
        destination: '/support/article/setting-alarms',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/how-do-i-adjust-the-pens',
        destination: '/support/article/how-do-i-adjust-the-pens',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-does-the-display-read-prob',
        destination: '/support/article/why-does-the-display-read-prob',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-doesnt-the-chart-recorder-respond-to-changes',
        destination:
          '/support/article/why-doesnt-the-chart-recorder-respond-to-changes',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/why-doesnt-the-display-and-chart-match',
        destination: '/support/article/why-doesnt-the-display-and-chart-match',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/display-indicators-and-led-colors',
        destination: '/support/article/display-indicators-and-led-colors',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/how-to-change-charts',
        destination: '/support/article/how-to-change-charts',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/how-to-change-pens',
        destination: '/support/article/how-to-change-pens',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/change-the-dip-switch-settings',
        destination: '/support/article/change-the-dip-switch-settings',
        permanent: true
      },
      {
        source:
          '/resources/support/chart-recorder-support-articles/8-chart-recorder-calibration',
        destination: '/support/article/8-chart-recorder-calibration',
        permanent: true
      },

      {
        source: '/resources/support/dicksonware-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/updating-dicksonware-preferences',
        destination: 'support/article/updating-dicksonware-preferences',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/adding-and-deleting-users',
        destination: 'support/article/adding-and-deleting-users',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/creating-alarms',
        destination: 'support/article/creating-alarms',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/exporting-the-data',
        destination: 'support/article/exporting-the-data',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/dicksonware-wont-open',
        destination: 'support/article/dicksonware-wont-open',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/dicksonware-always-opens',
        destination: 'support/article/dicksonware-always-opens',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/connecting-loggers-to-dicksonware',
        destination: 'support/article/connecting-loggers-to-dicksonware',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/logger-is-not-recognized-by-dicksonware',
        destination: 'support/article/logger-is-not-recognized-by-dicksonware',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/downloading-the-loggers-data',
        destination: 'support/article/downloading-the-loggers-data',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/getting-started-with-dicksonware-2-0-secure',
        destination:
          'support/article/getting-started-with-dicksonware-2-0-secure',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/upload-data-from-dicksonware-to-dicksonone',
        destination:
          'support/article/upload-data-from-dicksonware-to-dicksonone',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonware-support-articles/configuring-loggers-in-dicksonware',
        destination: 'support/article/configuring-loggers-in-dicksonware',
        permanent: true
      },

      {
        source: '/resources/support/touchscreen-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/tsb-download-or-delete-data',
        destination: '/support/article/tsb-download-or-delete-data',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/device-does-not-download-all-stored-data',
        destination:
          '/support/article/device-does-not-download-all-stored-data',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/calibrating-the-tsb-device',
        destination: '/support/article/calibrating-the-tsb-device',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/power-and-battery-issues',
        destination: '/support/article/power-and-battery-issues',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/display-screen-will-not-stay-on',
        destination: '/support/article/display-screen-will-not-stay-on',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/export-the-device-data',
        destination: '/support/article/export-the-device-data',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/homescreen-display',
        destination: '/support/article/homescreen-display',
        permanent: true
      },
      {
        source: '/resources/support/touchscreen-support-articles/tsb-alarms',
        destination: '/support/article/tsb-alarms',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/display-issues',
        destination: '/support/article/display-issues',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/relay-functionality',
        destination: '/support/article/relay-functionality',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/buttons-are-not-working',
        destination: '/support/article/buttons-are-not-working',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/using-ethernet-or-poe',
        destination: '/support/article/using-ethernet-or-poe',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/set-a-passcode',
        destination: '/support/article/set-a-passcode',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/device-calibration',
        destination: '/support/article/device-calibration',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/audible-alarm-on-the-device',
        destination: '/support/article/audible-alarm-on-the-device',
        permanent: true
      },
      {
        source: '/resources/support/touchscreen-support-articles/tsb-overview',
        destination: '/support/article/tsb-overview',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/relay-wiring-diagram',
        destination: '/support/article/relay-wiring-diagram',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/twe-twp-overview',
        destination: '/support/article/twe-twp-overview',
        permanent: true
      },
      {
        source:
          '/resources/support/touchscreen-support-articles/tsb-firmware-update',
        destination: '/support/article/tsb-firmware-update',
        permanent: true
      },

      {
        source: '/resources/support/wizard2-support-articles',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/what-do-i-need-to-get-started',
        destination: '/support/article/what-do-i-need-to-get-started',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/how-to-modify-your-logger-repeater-network-structure',
        destination:
          '/support/article/how-to-modify-your-logger-repeater-network-structure',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/receiver-will-install-but-does-not-show-as-connected-in-the-software',
        destination:
          '/support/article/receiver-will-install-but-does-not-show-as-connected-in-the-software',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/loggers-will-not-install',
        destination: '/support/article/loggers-will-not-install',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/wizard2-software-locked-up-while-adding-a-device',
        destination:
          '/support/article/wizard2-software-locked-up-while-adding-a-device',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/where-database-and-log-files-are-stored',
        destination: '/support/article/where-database-and-log-files-are-stored',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/how-to-move-a-wizard2-system-to-a-new-pc-without-losing-data',
        destination:
          '/support/article/how-to-move-a-wizard2-system-to-a-new-pc-without-losing-data',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/how-a-logger-communicates-with-a-receiver',
        destination:
          '/support/article/how-a-logger-communicates-with-a-receiver',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/logger-will-not-transmit-data-after-being-setup',
        destination:
          '/support/article/logger-will-not-transmit-data-after-being-setup',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/not-receiving-sending-email-or-text-notifications',
        destination:
          '/support/article/not-receiving-sending-email-or-text-notifications',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/after-being-sent-in-for-calibration-logger-will-not-communicate',
        destination:
          '/support/article/after-being-sent-in-for-calibration-logger-will-not-communicate',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/problem-writing-read-polling-command-to-receiver',
        destination:
          '/support/article/problem-writing-read-polling-command-to-receiver',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/led-colors-defined',
        destination: '/support/article/led-colors-defined',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/usb-device-not-recognized-error-message-shows-when-i-plug-in-the-usb',
        destination:
          '/support/article/usb-device-not-recognized-error-message-shows-when-i-plug-in-the-usb',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/wizard-ethernet-installation-and-usage',
        destination: '/support/article/wizard-ethernet-installation-and-usage',
        permanent: true
      },
      {
        source:
          '/resources/support/wizard2-support-articles/how-to-check-if-a-logger-is-within-range-of-the-receiver',
        destination:
          '/support/article/how-to-check-if-a-logger-is-within-range-of-the-receiver',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone',
        destination: '/category/dicksonone-data-loggers',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/5704-2',
        destination: '/support',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/delete-an-alarm-unapply-alarm-template-from-a-device%e2%80%8b',
        destination:
          '/support/article/delete-an-alarm-unapply-alarm-template-from-a-device',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/create-a-report',
        destination: '/support/article/create-a-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/dashboard',
        destination: '/support/article/dashboard',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/dwe-error-codes',
        destination: '/support/article/dwe-error-codes',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/default-device-settings',
        destination: '/support/article/default-device-settings',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/single-sign-on',
        destination: '/support/article/single-sign-on',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/account-owner-and-manage-access-user',
        destination: '/support/article/account-owner-and-manage-access-user',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/expired-subscription',
        destination: '/support/article/expired-subscription',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/purchase-a-dicksonone-system',
        destination: '/support/article/purchase-a-dicksonone-system',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/warnings-vs-excursions',
        destination: '/support/article/warnings-vs-excursions',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/create-a-not-reporting-alarm',
        destination: '/support/article/create-a-not-reporting-alarm',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/alarm-delay-behavior',
        destination: '/support/article/alarm-delay-behavior',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/alarm-options',
        destination: '/support/article/alarm-options',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/apply-an-alarm-template-to-multiple-devices',
        destination:
          '/support/article/apply-an-alarm-template-to-multiple-devices',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/create-a-template-from-an-existing-devices-alarm',
        destination:
          '/support/article/create-a-template-from-an-existing-devices-alarm',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/alarm-escalation',
        destination: '/support/article/alarm-escalation',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/sensor-information-and-behaviors',
        destination: '/support/article/sensor-information-and-behaviors',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/accessing-and-enabling-api-keys',
        destination: '/support/article/accessing-and-enabling-api-keys',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/getting-started-with-dicksonone',
        destination: '/support/article/getting-started-with-dicksonone',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/monitoring-points',
        destination: '/support/article/monitoring-points',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/add-a-contact',
        destination: '/support/article/add-a-contact',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/edit-a-user',
        destination: '/support/article/edit-a-user',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/suspending-a-user',
        destination: '/support/article/suspending-a-user',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/user-roles',
        destination: '/support/article/user-roles',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/how-to-archive-a-device',
        destination: '/support/article/how-to-archive-a-device',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/change_logs',
        destination: '/support/article/change_logs',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/best-practices-and-reducing-twilio-costs',
        destination:
          '/support/article/best-practices-and-reducing-twilio-costs',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/creating-a-twilio-account',
        destination: '/support/article/creating-a-twilio-account',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/sub-accounts-within-twilio',
        destination: '/support/article/sub-accounts-within-twilio',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/set-a-twilio-rate-limit',
        destination: '/support/article/set-a-twilio-rate-limit',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/user-access-and-permissions',
        destination: '/support/article/user-access-and-permissions',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/country-codes-requiring-a-twilio-account-integration',
        destination:
          '/support/article/country-codes-requiring-a-twilio-account-integration',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/twilio-faqs',
        destination: '/support/article/twilio-faqs',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/disconnect-your-twilio-account-from-dicksonone',
        destination:
          '/support/article/disconnect-your-twilio-account-from-dicksonone',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/twilio-integration-overview',
        destination: '/support/article/twilio-integration-overview',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/add-a-new-user',
        destination: '/support/article/add-a-new-user',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/turn-https-on-off',
        destination: '/support/article/turn-https-on-off',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/connect-your-twilio-account-to-dicksonone',
        destination:
          '/support/article/connect-your-twilio-account-to-dicksonone',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/subscribe-to-dicksonone-emails',
        destination: '/support/article/subscribe-to-dicksonone-emails',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/creating-your-dicksonone-account',
        destination: '/support/article/creating-your-dicksonone-account',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/creating-alarm-schedules',
        destination: '/support/article/creating-alarm-schedules',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/create-an-alarm-template',
        destination: '/support/article/create-an-alarm-template',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/alarm-coverage-report',
        destination: '/support/article/alarm-coverage-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/connect-a-device-to-wifi',
        destination: '/support/article/connect-a-device-to-wifi',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/create-a-custom-alarm',
        destination: '/support/article/create-a-custom-alarm',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/credit-card-payment-failed-stripe',
        destination: '/support/article/credit-card-payment-failed-stripe',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/activating-your-account-with-monthly-credit-debit-card-billing',
        destination:
          '/support/article/activating-your-account-with-monthly-credit-debit-card-billing',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/activating-your-dicksonone-account-with-an-activation-code',
        destination:
          '/support/article/activating-your-dicksonone-account-with-an-activation-code',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/wifi-vs-ethernet',
        destination: '/support/article/wifi-vs-ethernet',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/delete-a-device',
        destination: '/support/article/delete-a-device',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/reset-the-devices-min-max',
        destination: '/support/article/reset-the-devices-min-max',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/events-log-audit-trail',
        destination: '/support/article/events-log-audit-trail',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/find-the-mac-address-of-a-device',
        destination: '/support/article/find-the-mac-address-of-a-device',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/download-data-manually-from-a-device',
        destination: '/support/article/download-data-manually-from-a-device',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/get-started-with-locations-and-general-structure',
        destination:
          '/support/article/get-started-with-locations-and-general-structure',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/view-report-history',
        destination: '/support/article/view-report-history',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/is-dicksonone-21-cfr-part-11-compliant',
        destination: '/support/article/is-dicksonone-21-cfr-part-11-compliant',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/what-operating-systems-do-i-need-to-run-dicksonone',
        destination:
          '/support/article/what-operating-systems-do-i-need-to-run-dicksonone',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/delete-a-user',
        destination: '/support/article/delete-a-user',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/export-the-account-data',
        destination: '/support/article/export-the-account-data',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/it-faqs',
        destination: '/support/article/it-faqs',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/device-and-outages-faqs',
        destination: '/support/article/device-and-outages-faqs',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/alarms-faqs',
        destination: '/support/article/alarms-faqs',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/connect-a-device-ethernet',
        destination: '/support/article/connect-a-device-ethernet',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/export-the-device-data',
        destination: '/support/article/export-the-device-data',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/export-graph-to-image-file',
        destination: '/support/article/export-graph-to-image-file',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/replaceable-sensor-disconnect',
        destination: '/support/article/replaceable-sensor-disconnect',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/too-many-escalations-for-a-given-condition',
        destination:
          '/support/article/too-many-escalations-for-a-given-condition',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/activate-your-dicksonone-account-2',
        destination: '/support/article/activate-your-dicksonone-account-2',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/change-the-device-settings',
        destination: '/support/article/change-the-device-settings',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/edit-a-report',
        destination: '/support/article/edit-a-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/edit-recipients-on-a-report',
        destination: '/support/article/edit-recipients-on-a-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/select-the-right-report',
        destination: '/support/article/select-the-right-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/wire-relay-pod',
        destination: '/support/article/wire-relay-pod',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/replace-a-device',
        destination: '/support/article/replace-a-device',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/add-or-remove-reference-lines',
        destination: '/support/article/add-or-remove-reference-lines',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/manage-firmware-settings',
        destination: '/support/article/manage-firmware-settings',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/device-loses-power-or-loses-network-connection',
        destination:
          '/support/article/device-loses-power-or-loses-network-connection',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/update-the-device-firmware',
        destination: '/support/article/update-the-device-firmware',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/securing-the-lorawan-rf-gateway',
        destination: '/support/article/securing-the-lorawan-rf-gateway',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/exporting-data-from-the-rf-logger',
        destination: '/support/article/exporting-data-from-the-rf-logger',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/creating-wifi-settings-files',
        destination: '/support/article/creating-wifi-settings-files',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/understand-the-device-graph',
        destination: '/support/article/understand-the-device-graph',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/deleting-a-rf-gateway',
        destination: '/support/article/deleting-a-rf-gateway',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/register-an-rf-gateway',
        destination: '/support/article/register-an-rf-gateway',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/verify-or-purchase-a-dicksonone-subscription',
        destination:
          '/support/article/verify-or-purchase-a-dicksonone-subscription',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/rf-system-troubleshooting',
        destination: '/support/article/rf-system-troubleshooting',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/add-or-delete-a-location',
        destination: '/support/article/add-or-delete-a-location',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/dicksonone-account-features',
        destination: '/support/article/dicksonone-account-features',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/edit-alarms',
        destination: '/support/article/edit-alarms',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/apply-an-alarm-template-to-a-device',
        destination: '/support/article/apply-an-alarm-template-to-a-device',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/review-and-acknowledge-alarm-alerts',
        destination: '/support/article/review-and-acknowledge-alarm-alerts',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/reviewing-device-data',
        destination: '/support/article/reviewing-device-data',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/understand-the-device-summary-data',
        destination: '/support/article/understand-the-device-summary-data',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/add-devices',
        destination: '/support/article/add-devices',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/dwe-quick-start-guide',
        destination: '/support/article/dwe-quick-start-guide',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/dicksonone-data-backup',
        destination: '/support/article/dicksonone-data-backup',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/it-requirements-and-notes',
        destination: '/support/article/it-requirements-and-notes',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/rf-logger-quick-start-guide',
        destination: '/support/article/rf-logger-quick-start-guide',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/rf-gateway-quick-start-guide',
        destination: '/support/article/rf-gateway-quick-start-guide',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/register-rf-loggers',
        destination: '/support/article/register-rf-loggers',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/touchscreen-twe-twp-and-tsb-quick-start-guide',
        destination:
          '/support/article/touchscreen-twe-twp-and-tsb-quick-start-guide',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/export-data-manually-from-a-device',
        destination: '/support/article/export-data-manually-from-a-device',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/replacing-the-sensor-on-a-device',
        destination: '/support/article/replacing-the-sensor-on-a-device',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/rf-gateway-firmware-updates',
        destination: '/support/article/rf-gateway-firmware-updates',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/it-technical-info',
        destination: '/support/article/it-technical-info',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/twilio-troubleshooting',
        destination: '/support/article/twilio-troubleshooting',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/troubleshooting-an-iseries-integration',
        destination: '/support/article/troubleshooting-an-iseries-integration',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/connect-iseries-equipment-dicksonone-advanced',
        destination:
          '/support/article/connect-iseries-equipment-dicksonone-advanced',
        permanent: true
      },
      {
        source:
          '/resources/support/dicksonone/connect-iseries-equipment-dicksonone-basic',
        destination:
          '/support/article/connect-iseries-equipment-dicksonone-basic',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/daily-temperature-check-report',
        destination: '/support/article/daily-temperature-check-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/alerts-report',
        destination: '/support/article/alerts-report',
        permanent: true
      },
      {
        source: '/resources/support/dicksonone/rf-logger-firmware-updates',
        destination: '/support/article/rf-logger-firmware-updates',
        permanent: true
      },
      {
        source: '/products/product-overview/data-loggers',
        destination: '/products/data-loggers',
        permanent: true
      },
      {
        source: '/products/product-overview/touchscreens',
        destination: '/products/data-loggers?tags=touchscreen',
        permanent: true
      },
      {
        source: '/products/product-overview/chart-recorders',
        destination: '/products/chart-recorders',
        permanent: true
      },
      {
        source: '/products/product-overview/on-premise',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/product-overview/indicators',
        destination: '/products',
        permanent: true
      },
      {
        source: '/product-tag/relays',
        destination: '/products/chart-recorders',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-tag/high-temperature',
        destination: '/products/data-loggers?tags=high-temperature',
        permanent: true
      },
      {
        source: '/product-tag/validation',
        destination: '/products/accessories?tags=validation',
        permanent: true
      },
      {
        source: '/product-tag/pressure',
        destination: '/products/data-loggers?tags=pressure,pressure,pressure',
        permanent: true
      },
      {
        source: '/product-tag/universal-input',
        destination: '/products/chart-recorders?tags=universal-input',
        permanent: true
      },
      {
        source: '/product-tag/recal',
        destination: '/products/services/calibration',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/bluetooth',
        destination: '/products/data-loggers?tags=bluetooth',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/bundles',
        destination: '/products/data-loggers',
        permanent: true
      },
      {
        source: '/product-category/vaccine-monitoring',
        destination: '/products/data-loggers?tags=vaccine-monitoring',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/dicksonone/starter-pack',
        destination: '/products/data-loggers?tags=dicksonone',
        permanent: true
      },
      {
        source: '/product-category/data-loggers',
        destination: '/products/data-loggers',
        permanent: true
      },
      {
        source: '/product-category/charts-pens/charts',
        destination: '/products/accessories?tags=charts-pens',
        permanent: true
      },
      {
        source: '/product-category/calibrations/re-calibration',
        destination: '/services/calibration',
        permanent: true
      },
      {
        source: '/product-category/software/on-premise',
        destination: '/products/data-loggers?tags=software',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders/disposable',
        destination: '/products/chart-recorders?tags=disposable',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors/first-generation',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-category/accessories/batteries',
        destination: '/products/accessories?tags=batteries',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/pressure-data-loggers',
        destination: '/products/data-loggers?tags=pressure',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders',
        destination: '/products/chart-recorders',
        permanent: true
      },
      {
        source: '/product-category/charts-pens/pens',
        destination: '/products/accessories?tags=charts-pens',
        permanent: true
      },
      {
        source: '/product-category/software/web-based',
        destination: '/products/data-loggers?tags=software',
        permanent: true
      },
      {
        source: '/product-category/calibrations/new-calibration',
        destination: '/services/calibration',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors/second-generation',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-category/accessories/extension-cables',
        destination: '/products/accessories?tags=extension-cables',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders/pressure',
        destination: '/products/chart-recorders?tags=pressure',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/voltage',
        destination: '/products/data-loggers?tags=voltage',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-category/software/desktop',
        destination: '/products/data-loggers?tags=software',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/dicksonone',
        destination: '/products/data-loggers?tags=dicksonone',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors/third-generation',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-category/accessories/power-adapters-plugs',
        destination: '/products/accessories?tags=power-adapters-plugs',
        permanent: true
      },
      {
        source: '/product-category/universal-input',
        destination: '/products/8-chart-recorder',
        permanent: true
      },
      {
        source: '/product-category/calibrations',
        destination: '/services/calibration',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders/8',
        destination: '/products/chart-recorders?tags=8',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/wifi-ethernet',
        destination: '/products/data-loggers?tags=wifi-ethernet',
        permanent: true
      },
      {
        source: '/product-category/accessories/labels-magnets',
        destination: '/products/accessories?tags=labels-magnets',
        permanent: true
      },
      {
        source: '/product-category/software',
        destination: '/products/data-loggers?tags=software',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders/6',
        destination: '/products/chart-recorders?tags=6',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/battery-operated',
        destination: '/products/data-loggers?tags=battery-operated',
        permanent: true
      },
      {
        source: '/product-category/accessories/probes',
        destination: '/products/accessories?tags=probes',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders/4',
        destination: '/products/chart-recorders?tags=4',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/wizard2',
        destination: '/products/data-loggers?tags=wizard2',
        permanent: true
      },
      {
        source: '/product-category/accessories/kits',
        destination: '/products/accessories?tags=kits',
        permanent: true
      },
      {
        source: '/product-category/indicators',
        destination: '/products/accessories?tags=indicators',
        permanent: true
      },
      {
        source: '/product-category/chart-recorders/3',
        destination: '/products/chart-recorders?tags-=3',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/usb',
        destination: '/products/data-loggers?tags=usb',
        permanent: true
      },
      {
        source: '/product-category/accessories/usb-cables',
        destination: '/products/accessories?tags=usb-cables',
        permanent: true
      },
      {
        source: '/product-category/charts-pens',
        destination: '/products/accessories?tags=charts-pens',
        permanent: true
      },
      {
        source: '/product-category/accessories/buffers',
        destination: '/products/accessories?tags=buffers',
        permanent: true
      },
      {
        source: '/product-category/accessories',
        destination: '/products/accessories',
        permanent: true
      },
      {
        source: '/product-category/accessories/cases',
        destination: '/products/accessories?tags=cases',
        permanent: true
      },
      {
        source: '/product-category/discontinued',
        destination: '/products/products',
        permanent: true
      },
      {
        source: '/product-category/accessories/filters',
        destination: '/products/accessories?tags=filters',
        permanent: true
      },
      {
        source: '/product-category/uncategorized',
        destination: '/products/data-loggers',
        permanent: true
      },
      {
        source: '/product-category/accessories/sensaphone',
        destination: '/products/accessories?tags=sensaphone',
        permanent: true
      },
      {
        source: '/product-category/accessories/serial-cables',
        destination: '/products/accessories?tags=serial-cables',
        permanent: true
      },
      {
        source: '/products/page/3',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/page/13',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/page/7',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/page/4',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/page/9',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/page/11',
        destination: '/products',
        permanent: true
      },
      {
        source: '/products/page/14',
        destination: '/products',
        permanent: true
      },

      {
        source: '/product-tag/replaceable-sensor',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-tag/product-builder',
        destination: '/products',
        permanent: true
      },
      {
        source: '/product-category/accessories/page/5',
        destination: '/products/accessories',
        permanent: true
      },
      {
        source: '/product-category/accessories/page/3',
        destination: '/products/accessories',
        permanent: true
      },
      {
        source: '/product-category/accessories/page/4',
        destination: '/products/accessories',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors/page/2',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-category/replaceable-sensors/page/3',
        destination: '/products/accessories?tags=replaceable-sensors',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/page/3',
        destination: '/products/data-loggers',
        permanent: true
      },
      {
        source: '/product-category/data-loggers/page/2',
        destination: '/products/data-loggers',
        permanent: true
      },

      {
        source: '/1-1621-01-scope-of-accreditation-8-31-2021',
        destination: '/a2la',
        permanent: true
      },
      {
        source: '/dickson_education_infographic',
        destination: '/products/data-loggers',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/06/HT350-HT350_Manual_v6_092414.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/HT350-HT350_Manual_v6_092414.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/06/PW8-187.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/PW8-187.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/02/PW4_09032019.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/PW4_09032019.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/02/VFC70_09032019.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/VFC70_09032019.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2020/05/DSB-Basic-Quickstart-Guide-new.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/DSB-Basic-Quickstart-Guide-new.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/06/SM_TM3_MANUAL-299.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/SM_TM3_MANUAL-299.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2019/06/WiZARD2-Installation-and-Operation-Manual-V1-9-1018.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/WiZARD2-Installation-and-Operation-Manual-V1-9-1018.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/03/GxP-Infographic.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/GxP-Infographic.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/06/HT300-Manual-v4-06282016.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/HT300-Manual-v4-06282016.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/06/RL200-RL200_Manual_v7.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/RL200-RL200_Manual_v7.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/04/EM-Infographic.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/EM-Infographic.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/09/TH6P-Manual-V6.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/TH6P-Manual-V6.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/07/Safety-Data-Sheet-3190K491.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Safety-Data-Sheet-3190K491.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/10/5BestVaccinePractices.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/5BestVaccinePractices.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/09/TH8P-Manual-V14-1.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/TH8P-Manual-V14-1.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/06/SK4-SL4-239.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/SK4-SL4-239.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/09/Atlas_Emerald-QSG-1.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Atlas_Emerald-QSG-1.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/06/SK_TK5_MANUAL-728.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/SK_TK5_MANUAL-728.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/05/oceaview2.1.1_user_guide_en.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/oceaview2.1.1_user_guide_en.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/05/A340-Glycol-Solution.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/A340-Glycol-Solution.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2022/06/Dickson-A2LA-Scope-of-Accreditation-1621-01-6-3-2022-1.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Dickson-A2LA-Scope-of-Accreditation-1621-01-6-3-2022-1.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2021/04/PR150-350_Manual_v2_040814-627.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/PR150-350_Manual_v2_040814-627.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2019/06/KT6-New-122.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/KT6-New-122.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/02/PR125-325-525_09030219.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/PR125-325-525_09030219.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2019/06/Dickson_KT8P___KT856_Manual_V6-671.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Dickson_KT8P___KT856_Manual_V6-671.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2019/07/Dickson_ISO17025-2017_Accreditation_Certificate.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Dickson_ISO17025-2017_Accreditation_Certificate.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2023/03/SPTP425_09102019.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2020/02/SPTP425_09102019.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/01/DBL-Quickstart-Guide-3.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/DBL-Quickstart-Guide-3.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2021/06/ES120-ES_MANUAL.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/ES120-ES_MANUAL.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/02/KT6_09042019-1.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/KT6_09042019-1.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2019/06/Copy_of_DWE_Quick_Start_Guide_FINAL-708.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Copy_of_DWE_Quick_Start_Guide_FINAL-708.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/02/KT8_09042019.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/KT8_09042019.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2021/06/TH700-Dickson_Hand_Held_Manual_V4_100313.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/TH700-Dickson_Hand_Held_Manual_V4_100313.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/02/SL4_09032019.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/SL4_09032019.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2020/08/Dickson-Oceasoft-Scope-of-Accreditation-1621-01-7-31-2020.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Dickson-Oceasoft-Scope-of-Accreditation-1621-01-7-31-2020.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2019/06/SP125_175_TP125_Web_Manual-302.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/SP125_175_TP125_Web_Manual-302.pdf',
        permanent: true
      },
      {
        source:
          '/wp-content/uploads/2021/07/Scope-of-Accreditation-Dickson-Oceasoft-1621-01-7-26-2021.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/Scope-of-Accreditation-Dickson-Oceasoft-1621-01-7-26-2021.pdf',
        permanent: true
      },
      {
        source: '/wp-content/uploads/2020/04/IQOQPQ-Info.pdf',
        destination:
          'https://dickson2021prd.wpengine.com/wp-content/uploads/2023/03/IQOQPQ-Info.pdf',
        permanent: true
      },
      {
        source: '/fr_fr',
        destination: '/fr-fr',
        permanent: true
      },
      {
        source: '/en_gb',
        destination: '/en-gb',
        permanent: true
      },
      {
        source: '/en_us',
        destination: '/en-us',
        permanent: true
      },
      {
        source: '/support/dicksonone',
        destination: '/category/dicksonone-data-loggers',
        permanent: true
      },
      {
        source: '/fr-fr/products/:slug*',
        destination: '/fr-fr/produits/:slug*',
        permanent: true,
        locale: false
      },
      {
        source: '/fr-fr/product/:path*',
        destination: '/fr-fr/produit/:path*',
        permanent: true,
        locale: false
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/fr-fr/surveillance-stockage-vaccins',
        destination: '/fr-fr/solutions/surveillance-stockage-vaccins',
        locale: false
      },
      {
        source: '/fr-fr/surveillance-chambres-froides-et-refrigerateurs',
        destination:
          '/fr-fr/solutions/surveillance-chambres-froides-refrigerateurs',
        locale: false
      },
      {
        source: '/fr-fr/surveillance-salles-blanches',
        destination: '/fr-fr/solutions/surveillance-salles-blanches',
        locale: false
      },
      {
        source: '/fr-fr/services/cartographie-de-temperature',
        destination: '/fr-fr/services/cartographie-temperature',
        locale: false
      },
      {
        source: '/fr-fr/dispositifs-medicaux',
        destination: '/fr-fr/solutions/dispositifs-medicaux',
        locale: false
      },
      {
        source: '/fr-fr/hopitaux-services-sante',
        destination: '/fr-fr/solutions/hopitaux-services-sante',
        locale: false
      },
      {
        source: '/fr-fr/agroalimentaire',
        destination: '/fr-fr/solutions/agroalimentaire',
        locale: false
      },
      {
        source: '/fr-fr/industrie-pharmaceutique',
        destination: '/fr-fr/solutions/industrie-pharmaceutique',
        locale: false
      },
      {
        source: '/fr-fr/services/installation-systeme-surveillance-temperature',
        destination: '/fr-fr/services/installation',
        locale: false
      },
      {
        source: '/fr-fr/fabrication-production',
        destination: '/fr-fr/solutions/fabrication-production',
        locale: false
      },
      {
        source: '/fr-fr/recherche',
        destination: '/fr-fr/solutions/recherche',
        locale: false
      },
      {
        source: '/fr-fr/surveillance-conditions-ambiantes',
        destination: '/fr-fr/solutions/surveillance-conditions-ambiantes',
        locale: false
      },
      {
        source: '/fr-fr/a-propos-disckson',
        destination: '/fr-fr/about-us',
        locale: false
      },
      {
        source: '/fr-fr/surveillance-incubateurs',
        destination: '/fr-fr/solutions/surveillance-incubateurs',
        locale: false
      },
      {
        source: '/vaccines',
        destination: '/solutions/vaccine-storage-monitoring',
        locale: false
      },
      {
        source: '/services/installation-systeme-surveillance-temperature',
        destination: '/fr-fr/services/installation',
        locale: false
      },
      {
        source: '/services/cartographie-de-temperature',
        destination: '/fr-fr/services/cartographie-temperature',
        locale: false
      }
    ]
  }
}
