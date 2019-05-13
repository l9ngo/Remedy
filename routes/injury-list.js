exports.viewAll = (req, res) => {
  this.client.query('SELECT * FROM sport', (error, results) => {
    if (error) {
      return console.log('Error fetching injury list', error);
    }
    // console.log('Current injury list results:', results.rows);

    res.render('injury-list', {
      title: 'Injury Information',
      injuryList: results.rows
    });
  });
};

exports.viewCommonInjuries = (req, res) => {
  const sportId = req.params.id;
  // Get all common injuries for a specific sport
  this.client.query(
    `SELECT s.sport_id, s.sport_name, s.sport_overview, s.sport_source, 
    i.c_injury_id AS injury_id, i.c_injury_name AS injury_name, 
    i.c_injury_overview AS injury_overview, i.c_injury_symptoms AS injury_symptoms, 
    i.c_injury_treatment AS injury_treatment, i.c_injury_source AS injury_source 
    FROM sport s JOIN sport_c_injury si 
    ON (s.sport_id = si.sport_id) 
    JOIN c_injury i ON (si.c_injury_id = i.c_injury_id) 
    WHERE s.sport_id = ${sportId}
    ORDER BY i.c_injury_name`,
    (error, results) => {
      if (error) {
        return console.log('Error fetching injury list', error);
      }
      // console.log('Current injury list results:', results.rows);

      const sport_name =
        results.rows.length === 0 ? 'Sport' : results.rows[0].sport_name;

      res.render('common-injuries', {
        title: 'Common Injuries',
        injuryList: results.rows,
        sport_name
      });
    }
  );
};

exports.viewInjuryDetails = (req, res) => {
  const injuryId = req.params.id;
  this.client.query(
    `SELECT * FROM c_injury
    WHERE c_injury_id = ${injuryId}`,
    (error, results) => {
      if (error) {
        return console.log('Error fetching injury list', error);
      }
      console.log('Current injury results:', results.rows);

      res.render('injury-details', {
        title: 'Injury Details',
        injuryData: results.rows[0]
      });
    }
  );
};
