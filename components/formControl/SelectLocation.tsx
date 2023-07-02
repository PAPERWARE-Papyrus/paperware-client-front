import { ApiHook, Util } from "@/common";
import { Record } from "@/common/protocol";
import { Select } from "antd";
import { useMemo } from "react";

type RecordType = Record.Location;

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  isPublic?: boolean;
}

export default function Component(props: Props) {
  const list = ApiHook.Inhouse.Location.useGetList({ query: {} });

  const options = useMemo(() => {
    return list.data?.items
      .filter(
        (x) => props.isPublic === undefined || x.isPublic === props.isPublic
      )
      .map((x) => ({
        label: <Item item={x} />,
        text: `${x.name} ${Util.formatAddress(x.address)}`,
        value: x.id,
      }));
  }, [list, props.isPublic]);

  return (
    <div className="flex flex-col gap-y-1">
      <Select
        value={props.value}
        onChange={props.onChange}
        options={options}
        filterOption={(input, option) => {
          if (!option) {
            return false;
          }
          return option.text.toLowerCase().includes(input.toLowerCase());
        }}
        showSearch
        allowClear
        placeholder="도착지 선택"
        dropdownMatchSelectWidth={false}
        disabled={props.disabled}
      />
    </div>
  );
}

interface ItemProps {
  item: RecordType;
}

function Item(props: ItemProps) {
  const x = props.item;
  return (
    <div className="flex font-fixed gap-x-4">
      <div className="flex-initial whitespace-pre">{x.name.padEnd(8)}</div>
      <div className="flex-1 text-gray-400 text-right">
        {Util.formatAddress(x.address)}
      </div>
    </div>
  );
}
