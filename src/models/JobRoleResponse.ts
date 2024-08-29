enum Locations {
    Amsterdam = 'Amsterdam',
    Atlanta = 'Atlanta',
    Belfast = 'Belfast',
    Birmingham = 'Birmingham',
    Buenos_Aires = 'Buenos Aires',
    Derry_Londonderry = 'Derry-Londonderry',
    Dublin = 'Dublin',
    Dusseldorf = 'Dusseldorf',
    Edinburgh = 'Edinburgh',
    Frankfurt = 'Frankfurt',
    Gdansk = 'Gdansk',
    Hamburg = 'Hamburg',
    Homeworker_Australia = 'Homeworker - Australia',
    Homeworker_Canada_Alberta = 'Homeworker - Canada - Alberta',
    Homeworker_Canada_British_Columbia = 'Homeworker - Canada - British Columbia',
    Homeworker_Canada_Nova_Scotia = 'Homeworker - Canada - Nova Scotia',
    Homeworker_Canada_Ontario = 'Homeworker - Canada - Ontario',
    Homeworker_Canada_Quebec = 'Homeworker - Canada - Quebec',
    Homeworker_Finland = 'Homeworker - Finland',
    Homeworker_France = 'Homeworker - France',
    Homeworker_Germany = 'Homeworker - Germany',
    Homeworker_Ireland = 'Homeworker - Ireland',
    Homeworker_Netherlands = 'Homeworker - Netherlands',
    Homeworker_Norway = 'Homeworker - Norway',
    Homeworker_Poland = 'Homeworker - Poland',
    Homeworker_Romania = 'Homeworker - Romania',
    Homeworker_Sweden = 'Homeworker - Sweden',
    Homeworker_Switzerland = 'Homeworker - Switzerland',
    Homeworker_UK = 'Homeworker - UK',
    Homeworker_USA = 'Homeworker - USA',
    Indianapolis = 'Indianapolis',
    London = 'London',
    Toronto = 'Toronto'
}

enum JobBands {
    Leadership_Community = 'Leadership Community',
    Principal = 'Principal',
    Manager = 'Manager',
    Consultant = 'Consultant',
    Senior_Associate = 'Senior Associate',
    Associate = 'Associate',
    Trainee = 'Trainee',
    Apprentice = 'Apprentice'
}

enum Capability {
    Engineering = 'Engineering',
    Platforms = 'Platforms',
    Data_and_Artificial_Intelligence = 'Data and Artificial Intelligence',
    Cyber_Security = 'Cyber Security',
    Workday = 'Workday',
    Experience_Design = 'Experience Design',
    Product = 'Product',
    Delivery = 'Delivery',
    Operations = 'Operations',
    Business_Development_and_Marketing = 'Business Development and Marketing',
    Organisational_Strategy_and_Planning = 'Organisational Strategy and Planning',
    People = 'People',
    Commercial_and_Financial_Management = 'Commercial and Financial Management',
    Business_Services_Support = 'Business Services Support'
}


export type JobRoleResponse = {
    roleId: number,
    roleName: String,
    locations: Locations,
    capability: Capability,
    band: JobBands,
    closingDate: Date
}