import "../css/App.css";
import useAxiosFunc from "../hooks/useAxiosFunc";
import axios from "../apis/CourseApi";
import Select from "react-select/";
import AsyncSelect from "react-select/async";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const COURSE_PREFIX_REGEX = /^[A-Z]{3}$/;
const COURSE_NUMBER_REGEX = /^[0-9]{3}$/;
const COURSE_SECTION_REGEX = /^[A-Z]{1}[0-9]{2}$/;

const SearchCourses = () => {
  const userRef = useRef();

  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueYear, setSelectedValueYear] = useState(null);
  const [selectedValueSemester, setSelectedValueSemester] = useState(null);

  const [coursePrefix, setCoursePrefix] = useState("");
  const [validPrefix, setValidPrefix] = useState(false);
  const [prefixFocus, setPrefixFocus] = useState(false);

  const [courseNumber, setCourseNumber] = useState("");
  const [validCourseNumber, setValidCourseNumber] = useState(false);
  const [courseNumberFocus, setCourseNumberFocus] = useState(false);

  const [courseSection, setCourseSection] = useState("");
  const [validCourseSection, setValidCourseSection] = useState(false);
  const [courseSectionFocus, setCourseSectionFocus] = useState(false);

  const [itemList, error, loading, axiosFetch] = useAxiosFunc();
  const [searchResults, setSearchResults] = useState([]);

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/loadcourses'
    });
  }

  const handleSubmit = () => {
    
    axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/searchcourses',
      requestConfig: {
        data: {
          instructorlastname: selectedValue,
          coursesemester: selectedValueSemester,
          courseyear: selectedValueYear,
          courseprefix: coursePrefix,
          coursenumber: courseNumber,
          coursesection: courseSection
        }
      }
    })

  }

  
    // Get Rid Of Duplicate Items In Data For Select List
    const getUnique = (array, key) => {
      if (typeof key !== 'function') {
        const property = key;
        key = function(item) { return item[property]; };
      }
      return Array.from(array.reduce((map, item) =>{
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
      }, new Map()).values());
    }

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  },[]);

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

  const loadOptions = (inputValue, callback) => {    
    const filteredOptions = itemList.filter((item) => item.instructorlastname.toLowerCase().includes(inputValue.toLowerCase()));
    callback(getUnique(filteredOptions, 'instructorlastname'));
  }
  // const loadSemester = (inputValue, callback) => {  
  //   const filteredOptions = itemList.filter((item) => item.coursesemester.toLowerCase().includes(inputValue.toLowerCase()));
  //   callback(filteredOptions);
  // }

  const loadYear = (inputValue, callback) => {  
    const filteredYear = itemList.filter((item) => item.courseyear.includes(inputValue));
    callback(getUnique(filteredYear, 'courseyear'));
  }

  const defaultOpts = getUnique(itemList, 'instructorlastname');
  const defaultYears = getUnique(itemList, 'courseyear');

  const options = [
  {value: "Summer", label: "Summer"},
  {value: "Fall", label: "Fall"},
  {value: "Spring", label: "Spring"},
  ];

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const handleChangeYear = (value) => {
    setSelectedValueYear(value);
  };

  const handleChangeSemester = (value) => {
    setSelectedValueSemester(value);
  };

  return (
    <>

      <section>
        <center>
          <h2>Search Courses</h2>
          <article width="85%">
            <form
              id="insertcourseform"
              name="theform"
              onSubmit={handleSubmit}
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
                          ref={userRef}
                          isMulti
                          error={error}
                          isLoading={loading}
                          placeholder="Search Faculty"
                          value={selectedValue}
                          getOptionLabel={(e) => e.instructorlastname}
                          getOptionValue={(e) => e.instructorlastname}
                          loadOptions={loadOptions}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="coursesemester">
                          Select a Semester:
                        </label>
                      </th>
                      <td>
                        <Select
                          value={selectedValueSemester}
                          placeholder="Select A Semester"
                          options={options}
                          onChange={handleChangeSemester}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="courseyear">Select a Year:</label>
                      </th>
                      <td>
                        <AsyncSelect
                          error={error}
                          isLoading={loading}
                          isMulti
                          value={selectedValueYear}
                          defaultOptions={defaultYears}
                          placeholder="Search Year"
                          loadOptions={loadYear}
                          getOptionLabel={(e) => e.courseyear}
                          getOptionValue={(e) => e.courseyear}
                          onChange={handleChangeYear}
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
                          onChange={(e) => setCoursePrefix(e.target.value.toUpperCase())}
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
                          <FontAwesomeIcon icon={faInfoCircle} />3 Digits
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
                          <FontAwesomeIcon icon={faInfoCircle} />3 Digits
                          <br />
                          (Ex: H01, C02, G04, S06, I01)
                          <br />
                          Capital Letter Followed By Two Numbers
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button>Search Course Information</button>
              </fieldset>
            </form>
          </article>
        </center>
      </section>
      {}
      {/* <table width="85%">
        <tbody>
          <tr>
            <th colSpan={4}>
              <h3>Admin Test</h3>
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
            <td>CPT 162 H01</td>
            <td>Fall 2019</td>
            <td>YES</td>
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
          <tr>
            <th colSpan={3}>
              To send email with all classes to Admin Test please click
              <a href="mailto:admintest@hgtc.edu?Subject=Epic%20Course%20Submission%20Links&body=%0D%0A%0D%0ACPT%20162%20H50%20For%20Fall%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=2%26cp=CPT%26cn=162%26cs=H50%0D%0A%0D%0ACPT%20162%20H01%20For%20Fall%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=3%26cp=CPT%26cn=162%26cs=H01%0D%0A%0D%0ATEST%20test%20TEST%20For%20Summer%202020%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=60%26cp=TEST%26cn=test%26cs=TEST%0D%0A%0D%0AENG%20203%20H04%20For%20Spring%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=76%26cp=ENG%26cn=203%26cs=H04%0D%0A%0D%0AENG%20203%20H04%20For%20Spring%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=73%26cp=ENG%26cn=203%26cs=H04%0D%0A%0D%0ACPT%20101%20H01%20For%20Spring%202019%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=69%26cp=CPT%26cn=101%26cs=H01%0D%0A%0D%0AENG%20555%20H01%20For%20Spring%202021%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=64%26cp=ENG%26cn=555%26cs=H01%0D%0A%0D%0ACPT%20262%20H01%20For%20Spring%202021%20%20%20http://epic.istwebclass.org/updatecourse.php?cid=62%26cp=CPT%26cn=262%26cs=H01%0D%0A%0D%0A">
                HERE
              </a>
            </th>
          </tr>
        </tbody>
      </table> */}

    </>
  );
}

export default SearchCourses;
