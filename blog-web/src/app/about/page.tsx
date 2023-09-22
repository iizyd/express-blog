import Image from "next/image";
import IconJs from "../../../public/icon-js.svg";
import IconTs from "../../../public/icon-ts.svg";
import IconReact from "../../../public/icon-react.svg";
import IconVue from "../../../public/icon-vue.svg";
import IconNode from "../../../public/icon-node.svg";
import IconVscode from "../../../public/icon-vscode.svg";

export default function About() {
  const skills = [
    { name: "Frontend", icons: [IconJs, IconTs, IconReact, IconVue] },
    { name: "Backend", icons: [IconNode] },
    { name: "Tools", icons: [IconVscode] },
  ];
  return (
    <div className="bg-white p-6 rounded-md">
      <p className="font-bold text-2xl mb-4">🥳 Who am I?</p>
      <p className="mb-4">
        G’day, mate! 👋 I am Benny Guo a professional web developer, who ❤️ to
        develop open source themes and applications. I have being a programmer
        for over 8 years, and have extensive experiences in both frontend and
        backend development.
      </p>
      <p className="mb-4">
        Hello!👋 我是三钻，一个专业的 web 开发者，空余时间热爱 ❤️
        开发开源主题和应用。在前端和后端开发方面共有超过 8 年的丰富开发经验。
      </p>
      <p>
        追求极致, 追求完美, 喜欢一个高效, 优雅, 高凝聚力的团队,
        立志于打造最优秀的产品, 成为一名既优雅而有深度的技术人才。
      </p>

      <p className="font-bold text-xl mb-4 mt-8">🧰 技能 & 工具</p>
      {skills.map((item, index) => {
        return (
          <div key={index} className="flex mb-4 items-center">
            <span className="mr-4 basis-16 underline-offset-2 underline">{item.name}</span>
            {item.icons.map((icon, icon_i) => {
              return (
                <Image
                  key={icon_i}
                  src={icon}
                  alt="icon"
                  width={40}
                  height={40}
                  className="mr-5"
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
