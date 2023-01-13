import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { DataContext } from "./MyContext";

export default function Form() {
  const [data, setData] = useContext(DataContext);
  const { register, handleSubmit } = useForm();


  const onSubmit = (input) => {
    setData([...data, { id: data.length > 0 ? data[data.length - 1].id + 1 : 1, name: input.name }]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input type="text" {...register("name")} />
        </label>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}