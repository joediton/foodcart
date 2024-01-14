import React from "react";
import { useQuery } from "@apollo/client";

export type TQueryProps = {
  children: any;
  query: any;
};

const Query: React.FC<TQueryProps> = (props) => {
  const { data, loading, error } = useQuery(props.query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return props.children({ data });
};

export default Query;