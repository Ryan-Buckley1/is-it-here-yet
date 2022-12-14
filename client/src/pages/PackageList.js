import { useQuery } from "@apollo/client";
import { QUERY_FULL_ME } from "../utils/queries";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import CircularProgress from "@mui/material/CircularProgress";

const PackageList = () => {
  const { loading, data } = useQuery(QUERY_FULL_ME, {
    fetchPolicy: "no-cache",
  });

  const me = data?.me || {};
  console.log(me.packages);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }
  if (data && me.packages.length === 0) {
    return (
      <div className="noTracked">
        <h2 className="noTracked">No Packages Tracked Yet</h2>
        <h4>
          <Link to={`/profile`}>Add one here!</Link>
        </h4>
      </div>
    );
  }

  return (
    <div>
      <h3 className="package-list-title"> Your Packages! </h3>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        direction="column"
        className="package-list"
      >
        {me.packages &&
          me.packages.map((stuff) => {
            if (stuff.expectedDelDate.startsWith("Delivered")) {
              return (
                <Grid
                  item
                  className="package-grid-item"
                  key={stuff.trackingNumber}
                >
                  <Card
                    sx={{
                      maxWidth: 500,
                      border: 2,
                      backgroundColor: "#a5d6a7",
                    }}
                    className="package-card"
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="tracking-number"
                      >
                        <Link to={`/package/${stuff.trackingNumber}`}>
                          {stuff.trackingNumber} <ArchiveIcon />
                        </Link>
                      </Typography>
                      <Typography
                        variant="body"
                        color="text.secondary"
                        className="carrier"
                      >
                        <a href={stuff.urlToTracking}>{stuff.carrier}</a>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stuff.expectedDelDate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            } else {
              return (
                <Grid
                  item
                  className="package-grid-item"
                  key={stuff.trackingNumber}
                >
                  <Card
                    sx={{
                      maxWidth: 500,
                      border: 1.99,
                      backgroundColor: "#ffecb3",
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="tracking-number"
                      >
                        <Link to={`/package/${stuff.trackingNumber}`}>
                          {stuff.trackingNumber} <UnarchiveIcon />
                        </Link>
                      </Typography>
                      <Typography variant="body1" color="secondary">
                        <a href={stuff.urlToTracking}>{stuff.carrier}</a>
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {stuff.expectedDelDate}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })}
      </Grid>
    </div>
  );
};

export default PackageList;
