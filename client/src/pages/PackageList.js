import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { QUERY_FULL_ME } from "../utils/queries";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const PackageList = () => {
  const { loading, data } = useQuery(QUERY_FULL_ME);

  const me = data?.me || {};

  if (!me.packageCount) {
    return <h2>No Packages Tracked Yet</h2>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3> Your Packages!</h3>

      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        direction="column"
        className="package-list"
      >
        {me.packages &&
          me.packages.map((stuff) => {
            if (stuff.expectedDelDate.startsWith("Delivered")) {
              return (
                <Grid item className="package-grid-item">
                  <Card
                    key={stuff.trackingNumber}
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
                        <Link to={`/profile/package/${stuff.trackingNumber}`}>
                          {stuff.trackingNumber}
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
                <Grid item className="package-grid-item">
                  <Card
                    key={stuff.trackingNumber}
                    sx={{
                      maxWidth: 500,
                      border: 2,
                      backgroundColor: "#ffecb3",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <Link to={`/profile/package/${stuff.trackingNumber}`}>
                          {stuff.trackingNumber}
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
