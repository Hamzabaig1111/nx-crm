import Header from "./components/Header";
import "./App.css";
import {
  BuildingStorefrontIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CurrencyRupeeIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "./components/BaseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ChartsComponent from "./components/ChartsComponent";
function App() {
  const [coursesCount, setCoursesCount] = useState();
  const [OrdersCount, setOrdersCount] = useState();
  const [recentProjects, setRecentProjects] = useState();
  const [agentConts, setAagentCount] = useState(0);
  const [last24earning, setLast24Earning] = useState(0);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["studentcount"],
    queryFn: () =>
      axios
        .get("/admissions/dlrs", {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/courses/getnumberofcourses",
          { withCredentials: true }
        );
        setCoursesCount(response.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/orders/ordersstatuscount",
          {
            withCredentials: true,
          }
        );
        setOrdersCount(response.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/orders/recentsorders",
          {
            withCredentials: true,
          }
        );
        setRecentProjects(response.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchData();
  }, []);
  console.log(recentProjects);
  // Get Total count of Agents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/agents/getagentcount",
          {
            withCredentials: true,
          }
        );
        setAagentCount(response.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchData();
  }, []);
  // Get Fee earning Record
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/feerecord/lastdayearning",
          {
            withCredentials: true,
          }
        );
        setLast24Earning(response.data);
      } catch (error) {
        console.error("Error", error.message);
      }
    };
    fetchData();
  }, []);
  let percentage = 90;
  console.log(agentConts);
  console.log("errorCount", error, error?.message);
  return (
    <div className="homeContainer">
      <Header routeName="Dashboard" />
      <div className="mainContainerContent">
        <div className="dateContainer">
          <form>
            <input className="mydate" type="date" />
          </form>
        </div>
        <div className="chartsContainerMainParent">
          <ChartsComponent />
        </div>
        <div className="contentboxesContainer">
          <div className="boxescontainer">
            <Link to="/agents">
              <div className="boxitem">
                <div className="iconContainerbox">
                  <BuildingStorefrontIcon className="hereoiconbox" />
                </div>
                <div className="boxsmallstatitem">
                  <div className="flexcol">
                    <span>Agents</span>
                    <span>{agentConts}</span>
                  </div>
                  <div className="percentageborder">{percentage}%</div>
                </div>
                <p>Last 24 hours</p>
              </div>
            </Link>
            <Link to="/earning">
              <div className="boxitem">
                {" "}
                <div className="iconContainerbox ffff">
                  <CurrencyRupeeIcon className="hereoiconbox" />
                </div>
                <div className="boxsmallstatitem">
                  <div className="flexcol">
                    <span>NexSkill Earning</span>
                    <span>7</span>
                  </div>
                  <div className="percentageborder">{percentage}%</div>
                </div>
                <p>Last 24 hours</p>
              </div>
            </Link>
            <div className="boxitem">
              {" "}
              <div className="iconContainerbox kkk">
                <UsersIcon className="hereoiconbox" />
              </div>
              <div className="boxsmallstatitem">
                <div className="flexcol">
                  <span>Batch In Progress</span>
                  <span>7</span>
                </div>
                <div className="percentageborder">{percentage}%</div>
              </div>
              <p>Last 24 hours</p>
            </div>
            <div className="boxitem">
              {" "}
              <div className="iconContainerbox othr">
                <CurrencyDollarIcon className="hereoiconbox" />
              </div>
              <div className="boxsmallstatitem">
                <div className="flexcol">
                  <span>Other Earning</span>
                  <span>7</span>
                </div>
                <div className="percentageborder">{percentage}%</div>
              </div>
              <p>Last 24 hours</p>
            </div>
            <Link to="expenses">
              <div className="boxitem">
                {" "}
                <div className="iconContainerbox eee">
                  <ChartBarIcon className="hereoiconbox" />
                </div>
                <div className="boxsmallstatitem">
                  <div className="flexcol">
                    <span>Expenses</span>
                    <span>7</span>
                  </div>
                  <div className="percentageborder">{percentage}%</div>
                </div>
                <p>Last 24 hours</p>
              </div>
            </Link>
          </div>
          <div className="statcontainer">
            <div className="RecentProjectContainer">
              <h1>Recent Projects</h1>
              <div className="recentprojectContent">
                <table className="recentprojecttable">
                  <thead className="recentprojectthead">
                    <tr className="recentprojecttr">
                      <th className="recentprojectth">Project Category</th>
                      <th className="recentprojectth">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects?.map((project) => {
                      return (
                        <tr key={project._id}>
                          <td className="recentprojecttd">
                            {project.project_category}
                          </td>
                          <td
                            className="recentprojecttd"
                            status={project.project_status}
                          >
                            {project.project_status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Link className="viewall" to="/orders">
                  <button>View All</button>
                </Link>
              </div>
            </div>
            <div className="SalesAnalytics">
              <h1>Sales Analytics</h1>
              {/* Earning Last 24 hours */}
              <div className="saleItemContainer">
                <div className="firesalesitem">
                  <div className="iconContainerbox">
                    <ShoppingCartIcon className="hereoiconbox" />
                  </div>
                  <div className="middlestat">
                    <p className="nos">Total Earning</p>
                    <span className="lastth">Last 24 hours</span>
                  </div>
                </div>
                <div className="colorsstatuContainer">
                  <span>Rs:{last24earning?.totalEarnings?.toFixed(2)}</span>
                </div>
              </div>
              {/* End Earning Details earning */}
              <div className="saleItemContainer">
                <div className="firesalesitem">
                  <div className="iconContainerbox">
                    <ShoppingCartIcon className="hereoiconbox" />
                  </div>
                  <div className="middlestat">
                    <p className="nos">No of Students</p>
                    <span className="lastth">Last 24 hours</span>
                  </div>
                </div>
                <div className="colorsstatuContainer">
                  <span>{isPending ? "Loading..." : data?.count}</span>
                </div>
              </div>
              <div className="saleItemContainer">
                <div className="firesalesitem">
                  <div className="iconContainerbox nocc">
                    <ShoppingCartIcon className="hereoiconbox" />
                  </div>
                  <div className="middlestat">
                    <p className="nos">No of Courses</p>
                    <span className="lastth">Inprogress Courses</span>
                  </div>
                </div>
                <div className="colorsstatuContainer">
                  <span>{coursesCount?.totalInProgressCourses}</span>
                </div>
              </div>
              <div className="saleItemContainer">
                <div className="firesalesitem">
                  <div className="iconContainerbox pinkcolor">
                    <ShoppingCartIcon className="hereoiconbox" />
                  </div>
                  <div className="middlestat">
                    <p className="nos">No of Projects</p>
                    <span className="lastth">Inprogress Projects</span>
                  </div>
                </div>
                <div className="colorsstatuContainer">
                  <span>{OrdersCount?.totalnumberofOrdres}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
