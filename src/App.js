import React, { useState, useRef } from "react";
import {
  Button,
  Collapse,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  makeStyles,
  InputLabel
} from "@material-ui/core";
import code from "./code";
import "./styles.css";

const DEFAULT_DOMAIN = "fruitionsite.com";
const DEFAULT_NOTION_URL =
  "https://stephenou.notion.site/771ef38657244c27b9389734a9cbff44";

function validDomain(domain) {
  return domain.match(
    /^((https:\/\/)|(http:\/\/))?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+(\/)?$/
  );
}

function validNotionUrl(url) {
  if (!url) return true;
  try {
    const link = new URL(url);
    return (
      (link.hostname.endsWith("notion.so") || link.hostname.endsWith("notion.site")) &&
      link.pathname.slice(-32).match(/[0-9a-f]{32}/)
    );
  } catch (e) {
    return false;
  }
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function App() {
  const [slugs, setSlugs] = useState([]);
  const [myDomain, setMyDomain] = useState("");
  const [notionUrl, setNotionUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [googleFont, setGoogleFont] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [optional, setOptional] = useState(false);
  const [copied, setCopied] = useState(false);
  const [defaultColor, setDefaultColor] = useState("");
  const handleMyDomain = (e) => {
    setMyDomain(e.target.value);
    setCopied(false);
  };
  const handleNotionUrl = (e) => {
    setNotionUrl(e.target.value);
    setCopied(false);
  };
  const handlePageTitle = (e) => {
    setPageTitle(e.target.value);
    setCopied(false);
  };
  const handlePageDescription = (e) => {
    setPageDescription(e.target.value);
    setCopied(false);
  };
  const handleGoogleFont = (e) => {
    setGoogleFont(e.target.value);
    setCopied(false);
  };
  const handleCustomScript = (e) => {
    setCustomScript(e.target.value);
    setCopied(false);
  };
  const handleColorChange = (e) => {
    setDefaultColor(e.target.value);
    setCopied(false);
  };
  const addSlug = () => {
    setSlugs([...slugs, ["", ""]]);
    setCopied(false);
  };
  const deleteSlug = (index) => {
    setSlugs([...slugs.slice(0, index), ...slugs.slice(index + 1)]);
    setCopied(false);
  };
  const handleCustomURL = (value, index) => {
    setSlugs([
      ...slugs.slice(0, index),
      [value, slugs[index][1]],
      ...slugs.slice(index + 1)
    ]);
    setCopied(false);
  };
  const handleNotionPageURL = (value, index) => {
    setSlugs([
      ...slugs.slice(0, index),
      [slugs[index][0], value],
      ...slugs.slice(index + 1)
    ]);
    setCopied(false);
  };
  const handleOptional = () => {
    setOptional(!optional);
  };
  const domain = myDomain || DEFAULT_DOMAIN;
  const url = notionUrl || DEFAULT_NOTION_URL;
  const myDomainHelperText = !validDomain(domain)
    ? "Please enter a valid domain"
    : undefined;
  const notionUrlHelperText = !validNotionUrl(notionUrl)
    ? "Please enter a valid Notion Page URL"
    : undefined;
  const noError = !myDomainHelperText && !notionUrlHelperText;
  const script = noError
    ? code({
        myDomain: domain,
        notionUrl: url,
        slugs,
        pageTitle,
        pageDescription,
        googleFont,
        defaultColor,
        customScript
      })
    : undefined;
  const textarea = useRef("");
  const copy = () => {
    if (!noError) return;
    textarea.current.select();
    document.execCommand("copy");
    setCopied(true);
  };
  const classes = useStyles();
  return (
    <section style={{ maxWidth: 666 }}>
      <TextField
        fullWidth
        helperText={myDomainHelperText}
        label="Your Domain (e.g. example.org)"
        onChange={handleMyDomain}
        margin="normal"
        placeholder={DEFAULT_DOMAIN}
        value={myDomain}
        variant="outlined"
      />
      <TextField
        fullWidth
        helperText={notionUrlHelperText}
        label={`Notion URL for ${domain}`}
        margin="normal"
        onChange={handleNotionUrl}
        placeholder={DEFAULT_NOTION_URL}
        value={notionUrl}
        variant="outlined"
      />
      {slugs.map(([customUrl, notionPageUrl], index) => {
        return (
          <section>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{`${domain}/`}</InputAdornment>
                )
              }}
              key="key"
              label="Pretty Link"
              margin="normal"
              placeholder="about"
              onChange={(e) => handleCustomURL(e.target.value, index)}
              value={customUrl}
              variant="outlined"
            />
            <TextField
              fullWidth
              label={`Notion URL for ${domain}/${customUrl || "about"}`}
              key="value"
              margin="normal"
              placeholder={DEFAULT_NOTION_URL}
              onChange={(e) => handleNotionPageURL(e.target.value, index)}
              value={notionPageUrl}
              variant="outlined"
            />
            <Button
              onClick={() => deleteSlug(index)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Delete this pretty link
            </Button>
          </section>
        );
      })}
      <section>
        <Button
          onClick={addSlug}
          size="small"
          variant="outlined"
          color="primary"
        >
          Add a pretty link
        </Button>
      </section>
      <section>
        <Button
          onClick={handleOptional}
          size="small"
          variant="outlined"
          color="primary"
        >
          Toggle Style And Script Settings
        </Button>
      </section>
      <Collapse in={optional} timeout="auto" unmountOnExit>
        <TextField
          fullWidth
          label="Page Title"
          margin="normal"
          onChange={handlePageTitle}
          value={pageTitle}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Page Description"
          margin="normal"
          onChange={handlePageDescription}
          value={pageDescription}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Custom Google Font"
          margin="normal"
          placeholder="Open Sans"
          onChange={handleGoogleFont}
          value={googleFont}
          variant="outlined"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Default Color</InputLabel>
          <Select
            native
            value={defaultColor}
            onChange={handleColorChange}
            inputProps={{
              name: "age",
              id: "age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            <option value={"light"}>Light</option>
            <option value={"dark"}>Dark</option>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Paste Your Custom Script"
          margin="normal"
          multiline
          placeholder="e.g. Google Analytics"
          onChange={handleCustomScript}
          rows={2}
          value={customScript}
          variant="outlined"
        />
      </Collapse>
      <section>
        <Button
          disabled={!noError}
          variant="contained"
          color="primary"
          disableElevation
          onClick={copy}
        >
          {copied ? "Copied!" : "Copy the code"}
        </Button>
      </section>
      {noError ? (
        <>
          <TextField
            fullWidth
            margin="normal"
            rowsMax={5}
            multiline
            inputRef={textarea}
            value={script}
            variant="outlined"
          />
        </>
      ) : (
        ""
      )}
    </section>
  );
}
