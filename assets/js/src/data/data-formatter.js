const dataFormatter = {
  /**
   * Returns and object with the wins, losses, and conference rank given a data
   * object received from an API call to stats.nba.com
   * @param {Object} data - A data object received from an API call
   * to stats.nba.com
   * @returns {Object} - An object with formatted team data
   */
  getWinsLossesAndConferenceRank(data) {
    const formattedData = {};

    for (let i = 0; i < data.resultSets.length; i++) {
      const resultSet = data.resultSets[i];

      if (resultSet.name.toLowerCase() === 'teaminfocommon') {
        for (let ii = 0; ii < resultSet.headers.length; ii++) {
          const header = resultSet.headers[ii];

          if (header.toLowerCase() === 'w') {
            formattedData.wins = resultSet.rowSet[0][ii];
          }

          if (header.toLowerCase() === 'l') {
            formattedData.losses = resultSet.rowSet[0][ii];
          }

          if (header.toLowerCase() === 'conf_rank') {
            formattedData.conferenceRank = resultSet.rowSet[0][ii];
          }
        }
      }
    }

    return formattedData;
  },
};

export default dataFormatter;
