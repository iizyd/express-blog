export default function About() {
  return (
    <div className="pt-10 pb-6 px-3">
      <h1 className="flex flex-col text-3xl text-black leading-normal tracking-wider font-font_1">
        <span>Hello,</span>
        <span>I&apos;m IIZYD</span>
      </h1>
      <div className="mt-6 text-gray-900 space-y-1.5">
        <p>🧑‍💻 前端开发者 / Front-end Developer</p>
        <p>🤩 正在做一些有趣的事 / Working on something interesting</p>
        <p>
          🥰{" "}
          <a
            href="https://github.com/iamzhiyudong"
            target="_blank"
            className="hover:underline"
          >
            Github
          </a>
          <span className="mx-1">·</span>
          <a
            href="https://pengtikui.cn/"
            target="_blank"
            className="hover:underline"
          >
            UI Reference Paranoid_K
          </a>
        </p>
      </div>
      <div className="mt-6 flex items-center space-x-3">
        <a
          className="block p-1.5 rounded-full text-white bg-[#171515] transition-opacity hover:opacity-75"
          target="_blank"
          title="Github"
          href="https://github.com/iamzhiyudong"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tabler-icon tabler-icon-brand-github"
          >
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
