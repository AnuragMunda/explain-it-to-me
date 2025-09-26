import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectMode = ({ setType } : { setType: (_type: 'kid' | 'adult') => void }) => {
  return (
    <div className="border border-[#1493ac] w-[180px] rounded-lg">
        <Select onValueChange={setType}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Explanation Style" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="kid">12 year old</SelectItem>
                <SelectItem value="adult">Adult</SelectItem>
            </SelectContent>
    </Select>
    </div>
  )
}

export default SelectMode