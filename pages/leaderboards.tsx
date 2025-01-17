import { NextPage } from "next";
import { MainLayout } from "../src/layouts/MainLayout";
import { useQuery } from "react-query";

const LeaderboardsPage: NextPage = () => {
    const { data, isLoading } = useQuery<
        Array<{ user: string; numberOfSongs: number }>
    >(["favorites"], async () => {
        const res = await fetch("/api/leaderboards", {
            method: "GET",
        }).then((r) => r.json());

        return res.data;
    });
    return (
        <MainLayout disableLoadingScreen>
            <div className="container p-5">
                <h1 className={"title mt-5"}>Song Collector Leaderboard</h1>
                <p>
                    To add more favorites, use <code>?fave</code> during the
                    stream!
                </p>
                <br />
                <p className={"is-hidden-desktop mt-1 mb-2"}>
                    <strong>Scroll sideways for more info!</strong>
                </p>
                <div
                    style={{
                        width: "100%",
                        overflow: "auto",
                    }}
                >
                    <table
                        className="table"
                        style={{
                            width: "100%",
                        }}
                    >
                        <thead>
                            <tr>
                                <td>
                                    <strong>Place</strong>
                                </td>
                                <td>
                                    <strong>User</strong>
                                </td>
                                <td>
                                    <strong>Song Number</strong>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td colSpan={4}>
                                        <div>Loading leaderboard...</div>
                                    </td>
                                </tr>
                            )}
                            {data?.map((entry, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{entry.user}</td>
                                        <td>{entry.numberOfSongs}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default LeaderboardsPage;
