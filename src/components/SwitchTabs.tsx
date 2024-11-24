import { FC, useState } from "react";

interface SwitchTabsProps {
  data: string[];
  onTabChange: (tab: string, index: number) => void;
}

const SwitchTabs: FC<SwitchTabsProps> = ({ data, onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const activeTab = (tab: string, index: number) => {
    setLeft(index * 100);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="h-9 bg-[#0d1e69b7] rounded-full p-1">
      <div className="flex items-center h-8 relative">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`${
              selectedTab === index ? "text-white" : ""
            } h-full flex items-center justify-center w-[100px] text-gray-400 relative cursor-pointer transition duration-500 z-10`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="h-8 w-[100px] rounded-full absolute bg-black/80 transition duration-300 mb-1 text-center"
          style={{ left }}
        />
      </div>
    </div>
  );
};

export default SwitchTabs;
