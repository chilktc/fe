import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { useState } from "react";
import { Button } from "./Button";

const meta: Meta<typeof Modal> = {
  title: "Shared/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Interactive = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => setIsOpen(false)}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-heading-6 font-bold text-gray-950 text-center mb-4">
            알림
          </h3>
          <p className="text-body-4 text-gray-600 text-center">
            이것은 공통 모달 컴포넌트입니다. 다양한 작업에 재사용할 수 있습니다.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export const CustomStyled: Story = {
  args: {
    isOpen: true,
    children: (
      <div className="flex flex-col items-start">
        <h3 className="text-heading-6 font-bold text-primary-400 text-left mb-4">
          커스텀 스타일 모달
        </h3>
        <p className="text-body-4 text-gray-400 text-left">
          이 모달은 다양한 클래스명을 통해 스타일이 커스터마이징 되었습니다.
        </p>
      </div>
    ),
    containerClassName: "bg-primary-900 border-primary-400 max-w-md",
    overlayClassName: "bg-primary-950/80 backdrop-blur-md",
    submitLabel: "확인",
    onSubmit: () => alert("확인"),
  },
};
