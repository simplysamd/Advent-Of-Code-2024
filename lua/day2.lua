

function getDataFromFile (filename)
	local data = {}

	for line in io.lines(filename) do
		table.insert(data, line)
	end
	
	return data
end

function doChallenge ()
	local data = getDataFromFile('../data/data_aoc_2.txt')
	
	for _,v in pairs(data) do
		print(v)
	end
end

doChallenge()
