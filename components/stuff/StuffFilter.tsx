import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  EyeOffIcon,
  EyeIcon,
  SelectorIcon,
} from '@heroicons/react/solid';
import { atom, useRecoilState } from 'recoil';
import { Fragment } from 'react';

const state = atom<string[]>({
  key: 'stuff/selected-tags',
  default: [],
});

export function useStuffFilter() {
  const [selectedTags, set] = useRecoilState(state);

  return {
    selectedTags,
    set,
  };
}

interface StuffFilterProps {
  availableTags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export function StuffFilter({
  availableTags,
  setSelectedTags,
  selectedTags,
}: StuffFilterProps) {
  const allVisible = selectedTags.length === availableTags.length;

  const toggleAllSelected = () => {
    if (allVisible) {
      setSelectedTags([]);
    } else {
      setSelectedTags(availableTags);
    }
  };

  return (
    <div className="w-60 mt-4">
      <Listbox value={selectedTags} onChange={setSelectedTags} multiple>
        <div className="relative mt-1">
          <div className="flex items-center">
            <span className="mr-2">Too much stuff?</span>
            <Listbox.Button
              as="span"
              className="text-brand-500 relative pr-[30px] inline cursor-pointer focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
            >
              <span className="block">Hide shit</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </Listbox.Button>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="pb-0 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#1a1a1a] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {availableTags.map((tag, tagIdx) => (
                <Listbox.Option
                  key={tagIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-700 text-gray-100' : 'text-gray-400'
                    }`
                  }
                  value={tag}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {tag}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
              <Listbox.Label
                as="li"
                className="flex justify-center items-center w-full relative bg-gray-700 sticky bottom-0 cursor-pointer select-none py-2 px-4 hover:bg-brand-500 hover:text-black"
                onClick={toggleAllSelected}
              >
                <>
                  {allVisible ? (
                    <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span className="ml-2">
                    {allVisible ? 'Hide all' : 'Show all'}
                  </span>
                </>
              </Listbox.Label>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
