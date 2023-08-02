import { Model } from "@/@shared";
import { PlanListItem } from "@/@shared/api";
import { ApiHook, Const, Util } from "@/common";
import { usePage } from "@/common/hook";
import { Icon, Popup, StatBar, Table, Toolbar } from "@/components";
import { Page } from "@/components/layout";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { TbHome, TbHomeShield } from "react-icons/tb";

type RecordType = PlanListItem;

export default function Component() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState<number | false>(false);

  const [page, setPage] = usePage();
  const list = ApiHook.Working.Plan.useGetList({
    query: {
      ...page,
      type: "INHOUSE",
    },
  });
  const [selected, setSelected] = useState<RecordType[]>([]);

  const only = Util.only(selected);

  const apiDelete = ApiHook.Inhouse.Warehouse.useDelete();
  const cmdDelete = useCallback(async () => {
    if (
      !only ||
      !(await Util.confirm(
        `선택한 내부 공정(${only.planNo})을 삭제하시겠습니까?`
      ))
    ) {
      return;
    }

    await apiDelete.mutateAsync(only.id);
  }, [apiDelete, only]);

  return (
    <Page title="내부 공정 목록" menu={Const.Menu.INHOUSE_PROCESS}>
      <StatBar.Container>
        <StatBar.Item icon={<TbHome />} label="작업 계획" value={"-"} />
        <StatBar.Item
          icon={<TbHomeShield />}
          label="작업 계획"
          value={"-"}
          iconClassName="text-purple-800"
        />
      </StatBar.Container>
      <Toolbar.Container>
        <Toolbar.ButtonPreset.Create
          label="내부 공정 등록"
          onClick={() => setOpenCreate(true)}
        />
        <div className="flex-1" />
        {only && (
          <Toolbar.ButtonPreset.Update
            label="상세 정보"
            onClick={() => setOpenUpdate(only.id)}
          />
        )}
      </Toolbar.Container>
      <Table.Default<RecordType>
        data={list.data}
        page={page}
        setPage={setPage}
        keySelector={(record) => record.id}
        selected={selected}
        onSelectedChange={setSelected}
        columns={[
          {
            title: "작업 번호",
            render: (record: Model.Plan) => (
              <div className="font-fixed">
                {Util.formatSerial(record.planNo)}
              </div>
            ),
          },
          {
            title: "상태",
            dataIndex: "status",
            render: (value: Model.Enum.PlanStatus) => (
              <div
                className={classNames("flex gap-x-2", {
                  "text-amber-600": value === "PREPARING",
                  "text-green-600": value === "PROGRESSING",
                  "text-black": value === "PROGRESSED",
                })}
              >
                <div className="flex-initial flex flex-col justify-center">
                  <Icon.PlanStatus value={value} />
                </div>
                <div className="flex-initial flex flex-col justify-center">
                  {Util.planStatusToString(value)}
                </div>
              </div>
            ),
          },
          {
            title: "작업 유형",
            render: (_value: any, record: RecordType) => (
              <div className="flex gap-x-2">
                {record.orderStock ? "정상 매출" : "내부 공정"}
              </div>
            ),
          },
          {
            title: "창고",
            render: (_, record) =>
              record.assignStockEvent?.stock.warehouse?.name,
          },
          ...Table.Preset.columnStockGroup<RecordType>(
            (record) => record.assignStockEvent?.stock
          ),
          ...Table.Preset.columnQuantity<RecordType>(
            (record) => record.assignStockEvent?.stock,
            (record) => record.assignStockEvent?.change,
            { prefix: "사용 예정", negative: true }
          ),
        ]}
      />
      <Popup.Plan.Create open={openCreate} onClose={setOpenCreate} />
      <Popup.Plan.ProcessUpdate open={openUpdate} onClose={setOpenUpdate} />
    </Page>
  );
}
