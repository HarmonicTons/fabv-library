import React, { useState, useEffect } from "react";
import Repository from "./Repository";
import { useAsyncFn } from "react-use";
import axios from "axios";

export interface IRepository {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
    url: string;
  };
  description: string;
  url: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
}

export interface GithubResponse {
  total_count: number;
  items: Array<IRepository>;
}

export const FindRepo: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [{ value: repositories }, fetchRepositories] = useAsyncFn(async () => {
    if (searchInput === "") {
      return [];
    }
    const response = await axios.get<GithubResponse>(
      `https://api.github.com/search/repositories?q=${searchInput}&sort=stars&order=desc`
    );
    return response.data.items;
  }, [searchInput]);
  useEffect(() => {
    if (searchInput.length < 3) {
      return;
    }
    fetchRepositories();
  }, [searchInput]);
  return (
    <div>
      <label htmlFor="search">Search repository: </label>
      <input
        id="search"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
      <ul>
        {repositories?.map(repo => (
          <li key={repo.name}>
            <Repository repository={repo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindRepo;
