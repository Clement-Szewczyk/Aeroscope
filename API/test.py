import csv

def find_aircraft(icao24):
    try:
        csv.field_size_limit(10 * 1024 * 1024)
        with open('./data/aircraft25_2.csv', 'r', encoding='utf-8') as file:
            reader = csv.reader(file, skipinitialspace=True)
            next(reader, None)  # Ignorer l'en-tête si présent
            print(f"Searching for ICAO24 code: {icao24}")
            
            for row in reader:
                if row and len(row) > 1:
                    row = [field if field.strip() else None for field in row]
                    #print(f"Checking row: {row}")
                    
                    if row[0] == icao24:
                        return row
    except FileNotFoundError:
        return None
    except (IndexError, csv.Error):
        return None

    return None

code = 'e4952a'

result = find_aircraft(code)
if result:
    print(result)
else:
    print("Aucun avion trouvé avec cet identifiant ICAO24.")