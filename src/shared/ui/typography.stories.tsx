import type { Meta, StoryObj } from '@storybook/react';

const TypographyDemo = () => (
  <div className="flex flex-col gap-10 p-8 min-h-screen">
    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">Headings</h2>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-heading-1">Heading 1</h1>
          <code className="text-[10px] text-gray-500 mt-1 block">className="text-heading-1"</code>
        </div>
        <div>
          <h2 className="text-heading-3">Heading 3</h2>
          <code className="text-[10px] text-gray-500 mt-1 block">className="text-heading-3"</code>
        </div>
        <div>
          <h3 className="text-heading-4">Heading 4</h3>
          <code className="text-[10px] text-gray-500 mt-1 block">className="text-heading-4"</code>
        </div>
      </div>
    </section>

    <section className="flex flex-col gap-4">
      <h2 className="text-gray-500 text-xs uppercase tracking-widest border-b border-gray-800 pb-2">Body Text</h2>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-body-1">Body 1</p>
          <code className="text-[10px] text-gray-500 mt-1 block">className="text-body-1"</code>
        </div>
        <div>
          <p className="text-body-2">Body 2</p>
          <code className="text-[10px] text-gray-500 mt-1 block">className="text-body-2"</code>
        </div>
        <div>
          <p className="text-body-4">Body 4</p>
          <code className="text-[10px] text-gray-500 mt-1 block">className="text-body-4"</code>
        </div>
      </div>
    </section>
  </div>
);

const meta: Meta<typeof TypographyDemo> = {
  title: 'Shared/Typography',
  component: TypographyDemo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TypographyDemo>;

export const Default: Story = {};
