import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Params } from "@/types/notification.types";
import { useState } from "react";

const ITEMSPERPAGE = 10;

type Props = {
  params: Params;
  setParams: React.Dispatch<React.SetStateAction<Params>>;
};

export default function PaginationComponent({ params, setParams }: Props) {
  const [totalItem, setTotalItem] = useState(100);

  const totalPage = Math.ceil(totalItem / ITEMSPERPAGE);

  const getPage = () => {
    const page = [];

    for (let i = 0; i < totalPage; i++) {
      page.push(i + 1);
    }

    return page;
  };

  const handleChoosePage = (page: number) => {
    setParams({ ...params, page });
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() =>
              setParams({
                ...params,
                page: Math.max(Math.max(params.page - 1, 1)),
              })
            }
          />
        </PaginationItem>
        {getPage().map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              isActive={params.page === item}
              onClick={() => handleChoosePage(item)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setParams({
                ...params,
                page: Math.min(params.page + 1, totalPage),
              })
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
