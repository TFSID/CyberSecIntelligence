let fs = require('fs');
let path = require("path");

let emptyResult = {
    success: false
};

/**
 * @param server
 * @param options
 * @returns {{index: function(*=, *=)}}
 */
export default function (server, options) {
    const index = (req) => {
        return (async function () {
            return await new Promise(function (reply) {
                let query = req.query || {};
                let file = typeof query.file == "string" ? query.file : null;

                if (!file || !fs.existsSync(__dirname + file)) {
                    return reply(emptyResult);
                }

                try {
                    let fileContent = fs.readFileSync(path.resolve(__dirname + file), 'utf8');

                    return reply({
                        success: true,
                        text: fileContent,
                    });
                } catch (e) {
                    return reply(emptyResult);
                }
            });
        })();
    };

    return {
        index: index
    };
};
