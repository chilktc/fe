import { useState } from "react";
import { useAppRouter } from "@/shared/lib/router";
import { SeeMoreIcon, DeleteIcon, CloseIcon } from "@/shared/icons";
import { HistoryTicketListItem } from "@/entities/history/model/types";
import { Modal } from "@/shared/ui";
import { useDeleteHistory } from "@/features/my-page/history";

interface HistoryItemProps {
  history: HistoryTicketListItem;
}

export function HistoryItem({ history }: HistoryItemProps) {
  const router = useAppRouter();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteHistory, isPending } = useDeleteHistory();

  const formattedDate = new Date(history.createdAt).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    },
  );

  const handleDelete = () => {
    deleteHistory(history.ticketId, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleNavigateDetail = () => {
    router.push(`/history/${history.ticketId}`);
  };

  return (
    <div
      onClick={handleNavigateDetail}
      className="py-2.5 px-4 border-b border-gray-400 flex items-center justify-between gap-1 cursor-pointer"
    >
      <div className="min-w-0 flex-1">
        <p className="text-heading-6 text-gray-900 truncate">{history.name}</p>
        <p className="text-label-3 text-gray-700">{formattedDate}</p>
      </div>
      <div className="flex items-center justify-end gap-2">
        {isDeleteMode && (
          <button
            className="w-15 h-11.5 bg-gray-200 border border-gray-400 rounded-full flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <DeleteIcon />
          </button>
        )}
        {!isDeleteMode ? (
          <button
            className="aspect-square h-11.5 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteMode(true);
            }}
          >
            <SeeMoreIcon />
          </button>
        ) : (
          <button
            className="aspect-square h-11.5 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteMode(false);
            }}
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleDelete}
        isSubmitLoading={isPending}
        submitLabel="삭제"
        cancelLabel="취소"
      >
        <div className="text-center py-4">
          <p className="text-heading-6 text-gray-900 font-bold mb-2">
            기록 삭제
          </p>
          <p className="text-label-2 text-gray-700">
            정말로 이 기록을 삭제하시겠습니까?
          </p>
        </div>
      </Modal>
    </div>
  );
}
