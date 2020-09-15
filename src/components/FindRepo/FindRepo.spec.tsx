import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";
import FindRepo, { IRepository } from "./FindRepo";

jest.mock("axios");

const mockAxios = axios.get as jest.Mock;
const emptyRepository = {
  name: "",
  description: "",
  html_url: "",
  id: 0,
  language: "",
  owner: {
    avatar_url: "",
    login: "",
    url: ""
  },
  stargazers_count: 0,
  url: "",
  watchers_count: 0
};

beforeEach(() => {
  mockAxios.mockClear();
});
afterEach(cleanup);

describe("FindRepo", () => {
  test("renders FindRepo component", () => {
    render(<FindRepo />);
    expect(screen.getByText(/Search repository/)).toBeInTheDocument();
  });
  test("find repo", async () => {
    const repos: IRepository[] = [
      {
        ...emptyRepository,
        name: "RepoName1"
      },
      {
        ...emptyRepository,
        name: "RepoName2"
      },
      {
        ...emptyRepository,
        name: "RepoName3"
      }
    ];
    mockAxios.mockImplementation(async () => {
      return { data: { total_count: 0, items: repos } };
    });
    render(<FindRepo />);
    const searchPromise = userEvent.type(screen.getByRole("textbox"), "git");
    await act(() => searchPromise);
    expect(screen.getByText(/RepoName1/)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toBe(3);
  });
});
