import type { Meta, StoryObj } from "@storybook/react-vite";

const Typography = () => (
  <div className="flex flex-col gap-10 p-8 min-h-screen">
    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
        Displays
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-display-1">Display 1</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-display-1
          </code>
        </div>
        <div>
          <p className="text-display-2">Display 2</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-display-2
          </code>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
        Headings
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-heading-1">Heading 1</h1>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-heading-1
          </code>
        </div>
        <div>
          <h2 className="text-heading-2">Heading 2</h2>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-heading-2
          </code>
        </div>
        <div>
          <h3 className="text-heading-3">Heading 3</h3>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-heading-3
          </code>
        </div>
        <div>
          <h4 className="text-heading-4">Heading 4</h4>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-heading-4
          </code>
        </div>
        <div>
          <h5 className="text-heading-5">Heading 5</h5>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-heading-5
          </code>
        </div>
        <div>
          <h6 className="text-heading-6">Heading 6</h6>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-heading-6
          </code>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
        Body Text
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-body-1">Body 1</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-body-1
          </code>
        </div>
        <div>
          <p className="text-body-2">Body 2</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-body-2
          </code>
        </div>
        <div>
          <p className="text-body-3">Body 3</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-body-3
          </code>
        </div>
        <div>
          <p className="text-body-4">Body 4</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-body-4
          </code>
        </div>
        <div>
          <p className="text-body-5">Body 5</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-body-5
          </code>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
        Labels
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-label-1">Label 1</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-label-1
          </code>
        </div>
        <div>
          <p className="text-label-2">Label 2</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-label-2
          </code>
        </div>
        <div>
          <p className="text-label-3">Label 3</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-label-3
          </code>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
        Captions
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-caption-1">Caption 1</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-caption-1
          </code>
        </div>
        <div>
          <p className="text-caption-2">Caption 2</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-caption-2
          </code>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">
        Buttons
      </h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-button-1">Button 1</p>
          <code className="text-[10px] text-gray-500 mt-1 block">
            className=text-button-1
          </code>
        </div>
      </div>
    </section>
  </div>
);

const meta: Meta<typeof Typography> = {
  title: "Shared/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {};
