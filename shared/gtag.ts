export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const gtag = {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
  page: (url: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore types are incorrect
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  },

  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  event: ({
    action,
    category,
    label,
    value,
  }: {
    action: string;
    category?: string;
    label?: string;
    value?: string;
  }) => {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  },
};
