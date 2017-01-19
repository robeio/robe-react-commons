# Change Log

## 1.0.84
* upgrade js-criteria library. 
* fixed js-criteria library build problem.


## 1.0.83
* LocalEndPoint pagination bug fixed. [Issue](https://github.com/robeio/robe-react-ui/issues/39)

## 1.0.82
* LocalEndPoint totalCount bug fixed. [Issue](https://github.com/robeio/robe-react-ui/issues/34)

## 1.0.81 
* Application loadI18n and i18n methods changed for the new multi-lang support.
* Application i18n supports 2 types of usage `Application.i18n(Class,"code1","code1",...)` for defaultProps and `Application.i18n(undefined,"code1","code1",...)` in render usage.

## 1.0.80
* Maps.getObjectsWhichHasKeyInMap null control added.

## 1.0.79
* Application.i18n method now takes code array. 

## 1.0.78
* removed unused webpack configurations.
* upgraded library dependencies.

## 1.0.77

* add *mergeArrays* method to **util/Arrays** as utility method.
* add *mergeArraysForNativeType* method to **util/Arrays** as utility method.
* add *removeAll* method to **util/Arrays** as utility method.
* add *removeAllForNativeType* method to **util/Arrays** as utility method.

## 1.0.76

* add *stringsToArray* method to **util/Strings** as utility method.
* changed *json-server* as *robe-json-server*
* removed webpack test configurations.
* refconfigurate eslint configurations.
* add grunt to execute eslint
* add eslint command to the test command. 
* removed karma library and karma plugins.
* reconfigured dependencies libraries.
* provides to execute developer and travis tests with jest.


## 1.0.74
* Class bug fixed.

## 1.0.73
* js-criteria version incremented.
* LocalEndPoint q support added.
* WebSocketStore added.
* Class bug fixed.

## 1.0.72
* LocalEndPoint bug fixed.

## 1.0.71
* Store.setReadUrl method updates the reading url of the store.
* RemoteEndPoint.setReadUrl updates the reading url of the endpoint.
* AjaxRequest.setUrl updates the url of the request.

## 1.0.70
* QueryParams.stringify 
    * now gets the url and returns concatted version.
    * isFirstParam bug fixed (pre-paramed urls)
* Dependencies updated.

## 1.0.69 
* changed test configurations from karma to jest.

## 1.0.68
* was updated ajax options given as props for endpoint
* javadoc updated in BaseStore and Store

## 1.0.67
* changed Structure Folder and files configuration of the project.
* fixed *clone* method problem which is defined of **Objects**
  
## 1.0.66
* changed *clone* method of **Objects** and added *clone* test method to **Objects.spec** .
* added *getTypeName*, *hasProperty* utility method to **Types**
* added cloning methods *cloneChilds*, , *cloneArray*, *cloneObject*, *clone* to **Objects** 
  
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
