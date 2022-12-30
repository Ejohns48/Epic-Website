import "../css/App.css";
import axios from "axios";
import React from "react";
import AsyncSelect from "react-select/async";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COURSE_PREFIX_REGEX = /^[A-Z]{3}$/;
const COURSE_NUMBER_REGEX = /^[0-9]{3}$/;
const COURSE_SECTION_REGEX = /^[A-Z]{1}[0-9]{2}$/;

function InsertCourse() {
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
    axios.get("http://localhost:3000/insertcourse").then((response) => {
      setItems(
        response.data.map((items) => {
          return items.value;
        })
      );
      console.log(items);
    });
  }, []);

  const options = items.forEach((item) => {
    return item.coursesemester.value;
  });
  const optionValue = items.forEach((item) => {
    return item.coursesemester.value;
  });
  const optionLabel = items.forEach((item) => {
    return item.coursesemester.value;
  });

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <section>
        <center>
          <h2>Insert Course Information</h2>
          <article width="85%">
            <form
              id="insertcourseform"
              method="post"
              action="/adminhgtc/selectcourse.php"
              name="theform"
            >
              <fieldset>
                <legend>Course Information</legend>
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="faculty">Faculty:</label>
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
                        <label htmlFor="coursesemester">Select a Semester:</label>
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
                              validPrefix || !coursePrefix ? "hide" : "invalid"
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
                >Insert Course Information</button>
              </fieldset>
            </form>
          </article>
        </center>
      </section>
    </div>
  );
}

export default InsertCourse;
