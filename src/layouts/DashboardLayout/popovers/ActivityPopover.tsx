import { Clear } from "@mui/icons-material";
import { Timeline, TimelineDot, TimelineItem } from "@mui/lab";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import { H5, H6, Small, Tiny } from "components/Typography";
import ActivityIcon from "icons/ActivityIcon";
import { FC, Fragment, useState } from "react";
import ScrollBar from "simplebar-react";

// styled component
const StyledTimelineItem = styled(TimelineItem)(() => ({
  "&:before": { padding: 0, flex: "none" },
}));

const StyledTimelineDot = styled(TimelineDot)(() => ({
  margin: 0,
  padding: 0,
  borderWidth: 0,
  boxShadow: "none",
  borderStyle: "none",
}));

const StyledTimelineConnector = styled(TimelineConnector)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}));

const ActivityPopover: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <Badge color="error" badgeContent={0}>
          <ActivityIcon fontSize="small" sx={{ color: "text.disabled" }} />
        </Badge>
      </IconButton>

      <Drawer
        open={open}
        elevation={0}
        anchor="right"
        onClose={() => setOpen(false)}
        sx={{ zIndex: 1212, "& .MuiPaper-root": { width: 300 } }}
      >
        <FlexBox alignItems="center" justifyContent="space-between" p={2}>
          <H5>Activity</H5>
          <IconButton onClick={() => setOpen(false)} size="small" sx={{ p: 0 }}>
            <Clear />
          </IconButton>
        </FlexBox>

        <Divider />

        <ScrollBar
          style={{ overflow: "auto", height: "calc(100% - (54px + 75px))" }}
        >
          <Timeline position="right">
            {activites.map((item, index) => (
              <SingleTimelineItem
                key={index}
                user={item.user}
                title={item.title}
                files={item.files}
              />
            ))}
          </Timeline>
        </ScrollBar>

        <Box p={2}>
          <Button
            fullWidth
            variant="outlined"
            sx={{ fontSize: 12, fontWeight: 400 }}
          >
            View all
          </Button>
        </Box>
      </Drawer>
    </Fragment>
  );
};

const activites = [
  {
    title: "Added 2 files to task FD-7",
    user: { name: "Iana Robinson", avatar: "/static/avatar/001-man.svg" },
    files: [
      {
        name: "weekly-reports.jpg",
        image: "/static/file-type/jpg.svg",
        size: "12kb",
      },
      {
        name: "weekly-reports.pdf",
        image: "/static/file-type/pdf.svg",
        size: "12kb",
      },
    ],
  },
  {
    title: "Added 5 card to Payments",
    user: { name: "Bob Dean", avatar: "/static/avatar/003-boy.svg" },
    files: [],
  },
  {
    title: "Added a new member to Front Dashboard",
    user: { name: "David Lidell", avatar: "/static/avatar/008-clown.svg" },
    files: [],
  },
  {
    title: "Added 2 files to task  FDF-2",
    user: { name: "Rachel King", avatar: "/static/avatar/010-girl-1.svg" },
    files: [
      {
        name: "daily-report.jpg",
        image: "/static/file-type/jpg.svg",
        size: "12kb",
      },
      {
        name: "daily-report.pdf",
        image: "/static/file-type/pdf.svg",
        size: "12kb",
      },
    ],
  },
  {
    title: "Marked FR-3 as Completed",
    user: { name: "Finch Hoot", avatar: "/static/avatar/018-boy-3.svg" },
    files: [],
  },
  {
    title: "Added 1 files to task  FDF-4",
    user: { name: "Finch Hoot", avatar: "/static/avatar/027-man-7.svg" },
    files: [
      {
        name: "monthly-summery.jpg",
        image: "/static/file-type/jpg.svg",
        size: "12kb",
      },
    ],
  },
  {
    title: "Added 2 files to task FD-7",
    user: { name: "Jason Roy", avatar: "/static/avatar/029-man-8.svg" },
    files: [
      {
        name: "weekly-reports.jpg",
        image: "/static/file-type/jpg.svg",
        size: "12kb",
      },
      {
        name: "weekly-reports.pdf",
        image: "/static/file-type/pdf.svg",
        size: "12kb",
      },
    ],
  },
  {
    title: "Added 5 card to Payments",
    user: { name: "Bob Dean", avatar: "/static/avatar/003-boy.svg" },
    files: [],
  },
];

// --------------------------------------------------------------

type SingleTimelineItemProps = {
  title: string;
  user: { name: string; avatar: string };
  files: { name: string; image: string; size: string }[];
};

function SingleTimelineItem(props: SingleTimelineItemProps) {
  const { title, user, files } = props;

  return (
    <StyledTimelineItem>
      <TimelineSeparator>
        <StyledTimelineDot>
          <AppAvatar src={user.avatar} sx={{ width: 30, height: 30 }} />
        </StyledTimelineDot>
        <StyledTimelineConnector />
      </TimelineSeparator>

      <TimelineContent sx={{ pr: 0, pt: 0, pb: 2 }}>
        <H6>{user.name}</H6>
        <Small display="block" color="text.disabled">
          {title}
        </Small>

        {files.length > 0 && (
          <Box
            sx={{
              mt: 2,
              padding: 1,
              borderRadius: 1,
              backgroundColor: "secondary.300",
            }}
          >
            <Grid container spacing={1}>
              {files.length > 0 &&
                files.map((file, index) => (
                  <Grid item xs={6} key={index}>
                    <FlexBox alignItems="center">
                      <img src={file.image} width="25px" alt="" />
                      <Box
                        sx={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontWeight: 500,
                          overflow: "hidden",
                          marginLeft: "5px",
                        }}
                      >
                        <Tiny sx={{ whiteSpace: "nowrap" }}>{file.name}</Tiny>
                        <Tiny
                          sx={{
                            fontSize: 8,
                            display: "block",
                            color: "text.disabled",
                          }}
                        >
                          {file.size}
                        </Tiny>
                      </Box>
                    </FlexBox>
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}

        <Tiny mt={1} display="block" color="text.disabled" fontWeight={500}>
          Now
        </Tiny>
      </TimelineContent>
    </StyledTimelineItem>
  );
}

// --------------------------------------------------------------

export default ActivityPopover;
