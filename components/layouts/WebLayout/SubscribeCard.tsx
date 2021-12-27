import React, { KeyboardEventHandler, useState } from 'react';
import { useBoolean } from 'shared/hooks/useBoolean';
import { APIRoutes } from 'shared/constants/client';

const isValidEmail = (email: string | undefined) => {
  if (!email) {
    return false;
  }

  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export function SubscribeCard() {
  const [error, setError] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  const [isLoading, { on, off }] = useBoolean();
  const [hasSubscribed, setHasSubscribed] = useState(false);

  const handleFormSubmit = async () => {
    setError(undefined);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return null;
    }

    on();

    try {
      const response = await fetch(APIRoutes.SUBSCRIBE, {
        body: JSON.stringify({ email }),
        method: 'POST',
      });

      if (response.status !== 200) {
        const errorMessage = await response
          .json()
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch((_) => {})
          .then((response) => response?.message);

        throw new Error(
          errorMessage ||
            "Hm, couldn't add you to the newsletter - ping me directly at andyasprou@gmail.com and I'll add you to this list!",
        );
      }

      setHasSubscribed(true);
    } catch (error) {
      setError((error as Error).message);
      console.error(error);
    }

    off();
  };

  const handleInputKeyEvent: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleFormSubmit();
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[500px] bg-white/5 relative">
      <p className="mb-2 text-lg text-white">Get the latest from me</p>
      <p className="mb-6 leading-normal">
        If you want to hear about updates about this place (new posts, new
        awesome products I find etc) add your email below:
      </p>
      {error && (
        <div className="mb-6">
          <p className="text-red-500 font-semibold">{error}</p>
        </div>
      )}
      {hasSubscribed ? (
        <p className="text-brand-500 font-semibold">
          Thanks! You're subscribed. Catch you on email.
        </p>
      ) : (
        <div className="md:flex-row flex-col flex">
          <input
            onChange={(event) => setEmail(event?.target?.value ?? '')}
            type="email"
            autoComplete="email"
            placeholder="Your email"
            className="mr-2 w-full disabled:opacity-75 px-2 py-1 bg-black border-brand-500 border focus:outline-none focus-visible:ring ring-brand-500/20 disabled:cursor-not-allowed"
            onKeyUp={(event) => handleInputKeyEvent(event)}
            disabled={isLoading}
          />

          <button
            className="min-w-[140px] text-black ml-0 md:ml-2 md:mt-0 mt-2 bg-brand-500 hover:bg-brand-500/90 active:bg-brand-500/80 focus:outline-none focus-visible:ring ring-brand-500/20 disabled:cursor-not-allowed"
            disabled={isLoading}
            onClick={handleFormSubmit}
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
