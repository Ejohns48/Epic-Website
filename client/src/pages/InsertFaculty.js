import "../css/App.css";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const USER_REGEX = /^[A-Z][a-zA-Z0-9-_]{1,23}$/;
const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;

function InsertFaculty() {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userLast, setUserLast] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [userLastNameFocus, setUserLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidLastName(USER_REGEX.test(userLast));
  }, [userLast]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  return (
    <div className="container">
      <div id="facultyform">
        <div id="facformheading">
          <h3>New Faculty Member Form</h3>
        </div>
        <form>
          <label htmlFor="userfirstname">
            First Name:
            <span className={validName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="userfirstname"
            ref={userRef}
            error={errMsg}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            required
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            2 to 24 characters.
            <br />
            Must begin with a capital letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <p
            id="requiredNote"
            className={
              (!userFocus &&
                !validName &&
                validPwd &&
                validMatch &&
                validEmail &&
                matchPwd) ||
              (!userFocus &&
                !validName &&
                validPwd &&
                validMatch &&
                !validEmail &&
                matchPwd)
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            This Field Is Required
          </p>
          <label htmlFor="userlastname">
            Last Name:
            <span className={validLastName ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validLastName || !userLast ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="userlastname"
            autoComplete="off"
            onChange={(e) => setUserLast(e.target.value)}
            required
            onFocus={() => setUserLastNameFocus(true)}
            onBlur={() => setUserLastNameFocus(false)}
          />
          <p
            id="uidnote2"
            className={
              userLastNameFocus && userLast && !validLastName
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            2 to 24 characters.
            <br />
            Must begin with a capital letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
          </p>
          <p
            id="requiredNote"
            className={
              (!userLastNameFocus &&
                !validLastName &&
                validPwd &&
                validMatch &&
                validEmail &&
                matchPwd) ||
              (!userLastNameFocus &&
                !validLastName &&
                validPwd &&
                validMatch &&
                !validEmail &&
                matchPwd)
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            This Field Is Required
          </p>
          <label htmlFor="email">
            Email:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="text"
            id="text"
            onChange={(e) => setEmail(e.target.value)}
            required
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must enter a valid E-mail address.
          </p>
          <p
            id="requiredNote"
            className={
              !emailFocus && !validEmail && validPwd && validMatch && matchPwd
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            This Field Is Required
          </p>
          <label htmlFor="password">
            Password:
            <span className={validPwd ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters: ! @ # $ %
          </p>
          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={matchPwd && validPwd && validMatch ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={
                !matchFocus || (validMatch && validPwd) ? "hide" : "invalid"
              }
            />
          </label>
          <input
            disabled={!validPwd ? true : false}
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Passwords Do Not Match...
          </p>
          <button
            disabled={
              !validName ||
              !validLastName ||
              !validEmail ||
              !validPwd ||
              !validMatch
                ? true
                : false
            }
          >
            Insert Faculty Member
          </button>
        </form>
      </div>
      <div id="infoOutput">
        <div id="memberlisttitle">
          <h3>Faculty Member List</h3>
        </div>
        <table>
          <tbody>
          <tr>
            <th>Name</th>
            <th>E-Mail</th>
          </tr>
          <tr>
            <td>Test User 1</td>
            <td>tu1@hgtc.edu</td>
          </tr>
          <tr>
            <td>Admin Test</td>
            <td>admintest@hgtc.edu</td>
          </tr>
          <tr>
            <td>Student Test</td>
            <td>studenttest@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 3</td>
            <td>Test User 3@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 4</td>
            <td>Test User 4@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 5</td>
            <td>Test User 5@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 6</td>
            <td>Test User 6@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 7</td>
            <td>Test User7@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 7</td>
            <td>Test User 7@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User8</td>
            <td>Test User 8@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 9</td>
            <td>Test User 9@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 10</td>
            <td>Test User 10@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 11</td>
            <td>Test User 11@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 1</td>
            <td>Test User 11@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 12</td>
            <td>Test User 12@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User 13</td>
            <td>TestUser13@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test Profressor</td>
            <td>TProf@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test Profressor</td>
            <td>TProf@hgtc.edu</td>
          </tr>
          <tr>
            <td>test2020</td>
            <td>test2020@mail.com</td>
          </tr>
          <tr>
            <td>Test 2021</td>
            <td>Test@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test 2021</td>
            <td>Tes</td>
          </tr>
          <tr>
            <td>dgffgd</td>
            <td>dgfg</td>
          </tr>
          <tr>
            <td>Test User 1</td>
            <td>tu1@hgtc.edu</td>
          </tr>
          <tr>
            <td>s</td>
            <td>tu1@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test_User_100</td>
            <td>Test_User_100@hgtc.edu</td>
          </tr>
          <tr>
            <td>hello</td>
            <td>hello@hello.com</td>
          </tr>
          <tr>
            <td>gjohns</td>
            <td>gjohns@hgtc.edu</td>
          </tr>
          <tr>
            <td>Rick Lea</td>
            <td>m3slick@aol.com</td>
          </tr>
          <tr>
            <td>Rick Lea</td>
            <td>m3slick@aol.com</td>
          </tr>
          <tr>
            <td>jgeral11</td>
            <td>jgeral11@hgtc.edu</td>
          </tr>
          <tr>
            <td>jalen keith</td>
            <td>jalenkeith3@gmail.com</td>
          </tr>
          <tr>
            <td>a</td>
            <td>a@a.com</td>
          </tr>
          <tr>
            <td>Harrison Smith</td>
            <td>hsmith@email.com</td>
          </tr>
          <tr>
            <td>Test User Proxy</td>
            <td>Error@test.com</td>
          </tr>
          <tr>
            <td>ejohns58</td>
            <td>bob@bob.co</td>
          </tr>
          <tr>
            <td>avmeade99@gmail.com</td>
            <td>joseph@gmai.com</td>
          </tr>
          <tr>
            <td>Joshep</td>
            <td>joseph@gmai.com</td>
          </tr>
          <tr>
            <td>asd</td>
            <td>asdasd@gmail.com</td>
          </tr>
          <tr>
            <td>Faculty123</td>
            <td>Faculrty@hgtc.edu</td>
          </tr>
          <tr>
            <td>Faculty123</td>
            <td>Faculrty@hgtc.edu</td>
          </tr>
          <tr>
            <td>Test User40</td>
            <td>notemail</td>
          </tr>
          <tr>
            <td>mills</td>
            <td>mills@hgtc.edu</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InsertFaculty;
