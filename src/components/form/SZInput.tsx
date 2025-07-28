import { IInput } from "@/types/global";
import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

const SZInput = ({
  name,
  label,
  type = "text",
  placeholder = "",
  disabled,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xl font-bold text-success">
          {label}
        </span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        // {...register(name)}
        {...register(name, type === "number" ? { valueAsNumber: true } : {})}
        className="input input-bordered  input-success bg-transparent"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SZInput;
