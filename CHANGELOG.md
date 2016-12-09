# Change Log


## 1.0.64
* changed *clone* method of **Objects** and added *clone* test method to **Objects.spec** .

## 1.0.63
* Dependencies update.
* Store create operation before read bug fixed.

## 1.0.62
* changed *clone* method of **Objects** and added *clone* test method to **Objects.spec** .

## 1.0.61
* *cloneState* method added to **ShallowComponent**. 
* *clone* method added to **Objects** gets Object clone.
* *bindsAll* method of **Class** changed. Restricted binding of React Component's standart methods.

## 1.0.60
* *isKnownType* method of **Assertions** changed. `FormData`, `File` objects accepted as known type.

## 1.0.59
* npm ingore updated. Now unnecessary files removed from npm repository.

## 1.0.58
* npm ingore updated. Now unnecessary files removed from npm repository.

## 1.0.57
* *replace* method of **MapArray** changed. We do not take old item any more. You just send the new item and it matches the old item by id.
The **id** must remain same, it is not allowed to change now.
* *update* method of **Store** changed. We do not take old item any more. You just send the new item and it matches the old item by id.
The **id** must remain same, it is not allowed to change now.
