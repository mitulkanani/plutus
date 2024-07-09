import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

type HeroVideoProps = {
  forModal?: boolean | null;
  setForModal: (quantity: boolean) => void;
  className?: string;
  isCloseOutSide?: boolean;
  customInterval?: number;
  handleCustomIntervalChange?: (
    val: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleAddCustomInterval?: () => void;
  setCustomInterval: (interval: string) => void;
  timeUnit: string;
  setTimeUnit: (val: string) => void;
};

const CustomInterval: React.FC<HeroVideoProps> = ({
  setForModal,
  forModal,
  isCloseOutSide = true,
  customInterval,
  handleCustomIntervalChange,
  handleAddCustomInterval,
  setCustomInterval,
  timeUnit,
  setTimeUnit,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setForModal(false);
    document.body.style.overflow = "unset";
  };

  const openModal = () => {
    setIsOpen(true);
    setForModal(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (forModal) {
      openModal();
    } else {
      closeModal();
    }
  }, [forModal]);

  const handleTimeUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeUnit(e.target.value);
  };

  const handleAddCustomIntervalWithUnit = () => {
    if (customInterval) {
      setCustomInterval(`${customInterval} ${timeUnit}`);
      handleAddCustomInterval?.();
      closeModal();
    }
  };

  return (
    <>
      <Modal
        ariaHideApp={false}
        onRequestClose={isCloseOutSide ? () => closeModal() : undefined}
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: "#22222282",
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          content: {
            width: 380,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            overflow: "hidden",
          },
        }}
        className="zoom-in-fade px-2 shadow-guestPriceModal outline-none bg-white rounded-xl"
      >
        <div
          className="pt-4 pl-2 cursor-pointer"
          onClick={() => setForModal(false)}
        >
          <Image src={"/svg/close.svg"} alt="close" width={20} height={20} />
        </div>
        <div className="flex flex-col mt-6">
          <span className="text-[#1c1c21] font-semibold text-[18px] leading-[20px] px-3 text-center">
            Enter custom interval as per your choice
          </span>
          <div className="my-4 flex gap-2 mx-4 flex-col items-center">
            <div className="flex items-center gap-2 w-full">
              <input
                type="number"
                value={customInterval}
                onChange={handleCustomIntervalChange}
                className="p-2 border rounded w-full text-[#1c1c21] focus:outline-none"
                placeholder="Enter custom interval"
              />
              <select
                value={timeUnit}
                onChange={handleTimeUnitChange}
                className="p-2 border rounded text-[#1c1c21] focus:outline-none"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
            <button
              onClick={handleAddCustomIntervalWithUnit}
              className="mt-2 bg-blue-500 w-fit text-white py-2 px-4 rounded"
            >
              Add Custom Interval
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CustomInterval;
