var db = new Mongo().getDB("thugcreditreport");
print(db.users.remove({}));
print("all users removed");
