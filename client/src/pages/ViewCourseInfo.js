import "../css/App.css";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { useRef, useState, useEffect } from "react";
import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COURSE_PREFIX_REGEX = /^[A-Z]{3}$/;
const COURSE_NUMBER_REGEX = /^[0-9]{3}$/;
const COURSE_SECTION_REGEX = /^[A-Z]{1}[0-9]{2}$/;

function ViewCourseInfo() {
  const userRef = useRef();

  const [items, setItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const [coursePrefix, setCoursePrefix] = useState("");
  const [validPrefix, setValidPrefix] = useState(false);
  const [prefixFocus, setPrefixFocus] = useState(false);

  const [courseNumber, setCourseNumber] = useState("");
  const [validCourseNumber, setValidCourseNumber] = useState(false);
  const [courseNumberFocus, setCourseNumberFocus] = useState(false);

  const [courseSection, setCourseSection] = useState("");
  const [validCourseSection, setValidCourseSection] = useState(false);
  const [courseSectionFocus, setCourseSectionFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPrefix(COURSE_PREFIX_REGEX.test(coursePrefix));
  }, [coursePrefix]);

  useEffect(() => {
    setValidCourseNumber(COURSE_NUMBER_REGEX.test(courseNumber));
  }, [courseNumber]);

  useEffect(() => {
    setValidCourseSection(COURSE_SECTION_REGEX.test(courseSection));
  }, [courseSection]);

  useEffect(() => {
    axios.get("http://localhost:3001/insertcourse").then((response) => {
      setItems(
        response.data.map((items) => {
          return items.value;
        })
      );
      console.log(items);
    });
  }, []);

  const options = items.forEach((item) => {
    return item;
  });
  const optionValue = items.forEach((item) => {
    return item.coursesemester;
  });
  const optionLabel = items.forEach((item) => {
    return item.coursesemester.valued;
  });
  // console.log(options);


  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="container">
        <div id="insertcourseform">
          <section>
            <h2>View Course Information</h2>
            <article>
              <form>
                <fieldset>
                  <legend>Course Information</legend>
                  <table>
                    <tbody>
                      <tr>
                        <th>
                          <label htmlFor="coursesemester">
                            Select a Semester:
                          </label>
                        </th>
                        <td>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            ref={userRef}
                            value={selectedValue}
                            getOptionLabel={optionLabel}
                            getOptionValue={optionValue}
                            loadOptions={options}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <label htmlFor="courseyear">Select a Year:</label>
                        </th>
                        <td>
                          <AsyncSelect
                            cacheOptions
                            defaultOptions
                            value={selectedValue}
                            getOptionLabel={optionLabel}
                            getOptionValue={optionValue}
                            loadOptions={options}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Enter the Course Prefix:</th>
                        <td>
                          <input
                            type="text"
                            id="courseprefix"
                            autoComplete="off"
                            onChange={(e) => setCoursePrefix(e.target.value)}
                            required
                            onFocus={() => setPrefixFocus(true)}
                            onBlur={() => setPrefixFocus(false)}
                          />
                          <label htmlFor="courseprefix">
                            <span className={validPrefix ? "valid" : "hide"}>
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validPrefix || !coursePrefix
                                  ? "hide"
                                  : "invalid"
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>
                          <p
                            id="uidnote"
                            className={
                              prefixFocus && !validPrefix
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 characters(Ex: CPT, ENG, SOC)
                            <br />
                            Capital Letters Only
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th>Enter the Course Number:</th>
                        <td>
                          <label htmlFor="coursenumber">
                            <input
                              type="text"
                              id="coursenumber"
                              autoComplete="off"
                              onChange={(e) => setCourseNumber(e.target.value)}
                              required
                              onFocus={() => setCourseNumberFocus(true)}
                              onBlur={() => setCourseNumberFocus(false)}
                            />
                            <span
                              className={validCourseNumber ? "valid" : "hide"}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validCourseNumber || !courseNumber
                                  ? "hide"
                                  : "invalid"
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>
                          <p
                            id="uidnote"
                            className={
                              courseNumberFocus && !validCourseNumber
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 Digits
                            <br />
                            (Ex: 101, 205, 121)
                            <br />
                            Numbers Only
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <th>Enter the Section:</th>
                        <td>
                          <input
                            type="text"
                            id="coursesection"
                            autoComplete="off"
                            onChange={(e) => setCourseSection(e.target.value)}
                            required
                            onFocus={() => setCourseSectionFocus(true)}
                            onBlur={() => setCourseSectionFocus(false)}
                          />
                          <label htmlFor="coursesection">
                            <span
                              className={validCourseSection ? "valid" : "hide"}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </span>
                            <span
                              className={
                                validCourseSection || !courseSection
                                  ? "hide"
                                  : "invalid"
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </span>
                          </label>
                          <p
                            id="uidnote"
                            className={
                              courseSectionFocus && !validCourseSection
                                ? "instructions"
                                : "offscreen"
                            }
                          >
                            <FontAwesomeIcon icon={faInfoCircle} />
                            3 Digits
                            <br />
                            (Ex: H01, C02, G04, S06, I01)
                            <br />
                            Numbers And Capital Letters Allowed
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    disabled={
                      !validPrefix || !validCourseNumber || !validCourseSection
                        ? true
                        : false
                    }
                  >
                    Search Course Information
                  </button>
                </fieldset>
              </form>
            </article>
          </section>
        </div>
        <div id="courseinfotable">
          <table>
            <tbody>
              <tr>
                <th colSpan={4}>
                  <h4>Admin Test</h4>
                </th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Semester</th>
                <th>Complete</th>
              </tr>
              <tr>
                <td>CPT 162 H50</td>
                <td>Fall 2019</td>
                <td>YES</td>
              </tr>
              <tr>
                <td colSpan={3} align="center">
                  <table border={2} width="90%">
                    <tbody>
                      <tr>
                        <th>SLO USED</th>
                        <th>3</th>
                        <th>2</th>
                        <th>1</th>
                      </tr>
                      <tr>
                        <td>SLO 1.2</td>
                        <td>4</td>
                        <td>4</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>SLO 1.3</td>
                        <td>4</td>
                        <td>4</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>SLO 2.2</td>
                        <td>4</td>
                        <td>5</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>SLO 2.4</td>
                        <td>5</td>
                        <td>4</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>SLO 3.2</td>
                        <td>1</td>
                        <td>8</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>CPT 162 H01</td>
                <td>Fall 2019</td>
                <td>YES</td>
              </tr>
              <tr>
                <td colSpan={3} align="center">
                  <table border={2} width="90%">
                    <tbody>
                      <tr>
                        <th>SLO USED</th>
                        <th>3</th>
                        <th>2</th>
                        <th>1</th>
                      </tr>
                      <tr>
                        <td>SLO 1.2</td>
                        <td>8</td>
                        <td>3</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>SLO 1.3</td>
                        <td>9</td>
                        <td>4</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>SLO 2.2</td>
                        <td>4</td>
                        <td>9</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>SLO 2.4</td>
                        <td>4</td>
                        <td>9</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>SLO 3.2</td>
                        <td>3</td>
                        <td>10</td>
                        <td>0</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>TEST test TEST</td>
                <td>Summer 2020</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>ENG 203 H04</td>
                <td>Spring 2019</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>ENG 203 H04</td>
                <td>Spring 2019</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>CPT 101 H01</td>
                <td>Spring 2019</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>ENG 555 H01</td>
                <td>Spring 2021</td>
                <td>NO</td>
              </tr>
              <tr>
                <td>CPT 262 H01</td>
                <td>Spring 2021</td>
                <td>NO</td>
              </tr>
            </tbody>
          </table>
          <table width="85%">
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCourseInfo;
