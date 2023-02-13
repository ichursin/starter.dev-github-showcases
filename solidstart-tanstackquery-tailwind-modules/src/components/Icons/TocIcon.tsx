import { IconProps } from './types';

export const TOCIcon = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={props.class ?? ''}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.75-1.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 8a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z"
      />
    </svg>
  );
};

export default TOCIcon;
