import { FaArrowAltCircleRight, FaBan, FaBullhorn, FaChartBar, FaCheckCircle, FaCrosshairs, FaDownload, FaRegBell } from "react-icons/fa";
import ModuleList from "../Modules/List";
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="d-flex">
            <div className="flex-grow-1">
                <ModuleList />
            </div>
            <div className="flex-grow-0 me-2 d-none d-lg-block mt-3" style={{ width: "300px" }}>
                <div className="container">
                    <h4>Course Status</h4>
                    <div className="row">
                        <div className="col">
                            <div className="button-row">
                                <button className="btn btn-light"><FaBan />
                                    Unpublish</button>
                                <button id="publish-button" className="btn btn-secondary"><FaCheckCircle />
                                    Published</button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="button-column">
                                <button className="btn btn-secondary" style={{ width: "100%" }}><FaDownload /> Import Existing Content</button>
                            </div>
                            <div className="button-column">
                                <button className="btn btn-secondary  btn-block"><FaArrowAltCircleRight /> Import from Commons</button>
                            </div>
                            <div className="button-column">
                                <button className="btn btn-secondary"><FaCrosshairs />
                                    Choose Home
                                    Page</button>
                            </div>
                            <div className="button-column">
                                <button className="btn btn-secondary"><FaChartBar />
                                    View
                                    Course Stream</button>
                            </div>
                            <div className="button-column">
                                <button className="btn btn-secondary"><FaBullhorn />
                                    New
                                    Announcement</button>
                            </div>
                            <div className="button-column">
                                <button className="btn btn-secondary"><FaChartBar />
                                    New
                                    Analytics</button>
                            </div>
                            <div className="button-column">
                                <button className="btn btn-secondary"> <FaRegBell />
                                    View
                                    Course Notifications</button>
                            </div>
                            <br />
                        </div>

                        <div className="coming-up ">
                            <div>
                                <ul className="list-group list-group-flush">
                                    <h5>To Do <Link className="float-end" to={""} />
                                    </h5>
                                    <hr />
                                    <li className="list-group-item"><a href="#"><i
                                        className="fa fa-minus-circle fa-rotate-90" aria-hidden="true"></i>
                                        Grade A1 - ENV + HTML <i className="fa fa-times fa-pull-right text-muted" aria-hidden="true"></i></a><br />
                                        <span className="sub-text">100 points | Sep 18 at 11:59PM</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="coming-up col">
                            <div>

                                <ul className="list-group list-group-flush">
                                    <h5>Coming up <a href="" className="float-end">
                                        <i className="fa fa-calendar-o" aria-hidden="true"></i> View Calendar</a>
                                    </h5>
                                    <hr />
                                    <li className="list-group-item"><a href=""><i className="fa fa-calendar"
                                        aria-hidden="true"></i> Lecture</a><br /> <span
                                            className="sub-text">CS4550.12631.202410<br />
                                            Oct 3 at 09:00am</span>
                                    </li>
                                    <li className="list-group-item"><a href=""><i className="fa fa-calendar"
                                        aria-hidden="true"></i> CS 5610 SP23
                                        Lecture</a><br /><span className="sub-text">CS4550.12631.202410 <br /> Aug 1 at
                                            21:30pm</span>
                                    </li>
                                    <li className="list-group-item"><a href=""><i className="fa fa-calendar"
                                        aria-hidden="true"></i> CS 5610 Web Development Lecture</a><br />
                                        <span className="sub-text">CS5610 06 SP23 Lecture
                                            <br />Dec 12 at 10:00am</span>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}
export default Home;

