export const GA_TRACKING_ID = 'UA-159450948-2'

export const pageview = url => {
  ;(window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  ;(window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}
